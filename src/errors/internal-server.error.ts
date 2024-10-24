import { CustomError } from './custom-app.error';

export class InternalServerError extends CustomError {
  constructor(message: string, source?: string) {
    super({
      code: 500,
      type: 'InternalServerError',
      message,
      source,
    });
  }
}
