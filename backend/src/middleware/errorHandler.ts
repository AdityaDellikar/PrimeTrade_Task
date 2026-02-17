import type { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.error(err);

  return res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
};
