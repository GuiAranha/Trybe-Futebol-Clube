import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import JWT from '../utils/jwt';

const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  const { data } = JWT.validateToken(token) as jwt.JwtPayload;

  req.body.user = data;

  next();
};

export default tokenMiddleware;
