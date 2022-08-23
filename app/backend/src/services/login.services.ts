import * as joi from 'joi';
import JWT from '../utils/jwt';
import Users from '../database/models/user';
import BaseError from '../utils/baseError';

export default class LoginService {
  constructor(private model = Users) {
    this.model = model;
  }

  static validateLogin(email: string, password: string) {
    const schema = joi.object({
      email: joi.string().required().email(),
      password: joi.string().required().min(6),
    }).validate({ email, password });

    if (schema.error) {
      console.log(schema.error.message);
      throw new BaseError(400, 'All fields must be filled');
    }
  }

  public async login(email: string, password: string): Promise<string | void> {
    LoginService.validateLogin(email, password);
    // console.log(LoginService.validateLogin(email, password));
    const data = await this.model.findOne({ where: { email } });
    if (!data) throw new BaseError(401, 'Incorrect email or password');
    const token = JWT.generateToken(data);
    return token;
  }
}
