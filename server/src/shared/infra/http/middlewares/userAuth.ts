import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface ITokenPayload {
  id: number;
  name: string;
  iat: number;
  exp: number;
}

export default function userAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Login é necessário' });
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, 'secretKey');

    const { id, name } = data as ITokenPayload;

    req.company = {
      id,
      name
    };

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Login é necessário' });
  }
}
