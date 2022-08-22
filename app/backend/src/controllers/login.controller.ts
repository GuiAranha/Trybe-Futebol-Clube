import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/login.services';

export default class LoginController {
  constructor(private loginService = new LoginService()) {
  }

  public static validateLogin(req: Request, res: Response) {
    const { user } = req.body;
    return res.status(200).json({ role: user.data.role });
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const data = await this.loginService.login(email, password);
      console.log(data);
      return res.status(200).json({ token: data });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
