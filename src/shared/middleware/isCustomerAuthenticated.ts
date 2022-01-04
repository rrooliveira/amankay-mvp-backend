import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isCustomerAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const headers = request.headers.authorization;

  if (!headers) {
    throw new AppError('JWT Token is missing.');
  }

  const [, token] = headers.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as ITokenPayload;

    request.customer = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token.');
  }
}
