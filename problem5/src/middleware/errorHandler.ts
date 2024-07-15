// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { MongooseError } from 'mongoose';

const errorHandler = (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log('error :>> ', err);
  if (
    err instanceof MongooseError &&
    err.name === 'CastError' &&
    err.message.includes('ObjectId')
  ) {
    res.status(400).json({ error: 'Invalid ObjectId' });
  }
  res.status(500).json({ error: 'Something went wrong!' });
  next();
};

export default errorHandler;
