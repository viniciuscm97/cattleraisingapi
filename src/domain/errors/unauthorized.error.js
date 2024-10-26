import { CustomError } from './custom-app.error.js';

export class UnauthorizedError extends CustomError {
  constructor(message, source) {
    super({
      code: 401,
      type: 'Unauthorized',
      message,
      source,
    });
  }
}
