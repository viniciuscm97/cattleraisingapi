import { CustomError } from './custom-app.error';

export class BadRequestError extends CustomError {
  constructor(message: string, source?: string, details?: any) {
    super({
      code: 400,
      type: 'BadRequest',
      message,
      source,
      details,
    });
  }
}
