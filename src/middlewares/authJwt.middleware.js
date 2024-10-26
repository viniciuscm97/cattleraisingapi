
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../domain/errors/unauthorized.error.js';
import { ENV } from '../domain/system/env.js';


export function authJwtMiddleware(
  req,
  res,
  next,
) {
  const token = req.headers.authorization;

  if (!token) {
    throw new UnauthorizedError('Token not provided');
  }

  const [bearer, authToken] = token.split(' ');

  if (bearer !== 'Bearer' || !authToken) {
    throw new UnauthorizedError('Invalid token');
  }

  jwt.verify(authToken, ENV.JWT_SECRET, (
    err,
    decoded,
  ) => {
    if (err || !decoded?.userId || typeof decoded.userId !== 'string') {
      const message = err?.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
      throw new UnauthorizedError(message);
    }

    req.userId = decoded?.userId;

    return next();
  });
}
