import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import BaseError from './baseError';

dotenv.config();

const secret = process.env.JWT_SECRET || 'Strong-Password';

export default class JWT {
  static generateToken(user: IUser): string {
    const config: jwt.SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: user }, secret, config);
    return token;
  }

  static validToken(token: string) {
    try {
      const verified = jwt.verify(token, secret);
      return verified;
    } catch (err) {
      throw new BaseError(401, 'Token must be a valid token');
    }
  }
}
