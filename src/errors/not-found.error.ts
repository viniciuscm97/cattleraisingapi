import { CustomError } from './custom-app.error';

export class NotFoundError extends CustomError {
  constructor(message: string, source?: string) {
    super({
      code: 404,
      type: 'NotFound',
      message,
      source,
    });
  }
}
