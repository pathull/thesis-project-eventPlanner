import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const pageNotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: 'Page not Found',
    route: req.originalUrl,
    method: req.method,
    status: 404,
    code: 0,
  });
};
