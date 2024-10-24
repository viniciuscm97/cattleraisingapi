import { CustomError } from './custom-app.error.js';

export class BadRequestError extends CustomError {
  constructor(message, source, details) {
    super({
      code: 400,
      type: 'BadRequest',
      message,
      source,
      details,
    });
  }
}
