import { ZodError } from 'zod';
import { CustomError } from '../domain/errors/custom-app.error.js';

export const ErrorMiddleware = (
  err,
  _req,
  res,
  _next,
) => {
  if (err instanceof CustomError) {
    const { apiError } = err;
    console.error('An error ocurred at: ', err.message);
    
    return res.status(apiError.code).json({
      error: apiError.type,
      message: apiError.message,
      source: apiError.source,
      details: apiError.details,
    });
  } else if (err instanceof ZodError) {
    res.status(400).json({
      error: 'ValidationError',
      details: err.errors,
    });
  } else {
    const errorMessage = `An unexpected error ocurred at: ${err.message}`;
    
    console.error(errorMessage);
    
    res.status(err.apiError?.code || 500).json({
      error: 'InternalServerError',
      message: errorMessage,
    });
  }

  _next();
};
