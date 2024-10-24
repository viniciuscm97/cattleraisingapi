import { ZodError } from 'zod';
import { formatZodError } from '../utils/zodErrors';

import { CustomError } from '../errors/custom-app.error';

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
      friendlyMessage: apiError.friendlyMessage,
    });
  } else if (err instanceof ZodError) {
    const zodError = formatZodError(err);

    res.status(400).json({
      error: 'ValidationError',
      details: zodError,
    });
  } else {
    console.error('An unexpected error ocurred at: ', err.message);
    res.status(err.apiError?.code || 500).json(err);
  }

  _next();
};
