import { NextFunction, Request, Response } from 'express';
import { Auth, TokenPayload } from './auth.js';
import { HTTPError } from '../../common/error.js';

export interface RequestCool extends Request {
  info?: TokenPayload;
}

export class Interceptors {
  constructor() {}

  logged(req: RequestCool, resp: Response, next: NextFunction) {
    const authHeader = req.get('Authorization');

    try {
      if (!authHeader)
        throw new HTTPError(498, 'Token expired', 'No value in http header');

      if (!authHeader.startsWith('Bearer'))
        throw new HTTPError(498, 'Token invalid', 'Not Bearer in auth header');

      const token = authHeader.slice(7);
      const payload = Auth.verifyJWT(token);
      req.info = payload;
      next();
    } catch (error) {
      next(error);
    }
  }

  authorized(req: RequestCool, resp: Response, next: NextFunction) {
    try {
      if (!req.info)
        throw new HTTPError(498, 'Token expired', 'No value in http header');

      if (req.info.role === 'fan')
        throw new HTTPError(498, 'Invalid role', 'Role is not Team Manager');
      next();
    } catch (error) {
      next(error);
    }
  }
}
