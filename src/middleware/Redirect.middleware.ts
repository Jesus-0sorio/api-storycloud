import { NextFunction, Request, Response } from 'express';

export const RedirectMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.originalUrl === '/') {
    res.redirect('/api');
  }
  next();
};
