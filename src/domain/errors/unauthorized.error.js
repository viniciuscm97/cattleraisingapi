import { CustomError } from './custom-app.error.js';

export class UnauthorizedError extends CustomError {
  constructor(message: string, source?: string, friendlyMessage?: string) {
    super({
      code: 401,
      type: 'Unauthorized',
      message,
      source,
      friendlyMessage,
    });
  }
}
