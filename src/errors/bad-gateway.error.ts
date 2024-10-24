import { CustomError } from './custom-app.error';

export class BadGatewayError extends CustomError {
  constructor(message: string, source?: string, details?: any) {
    super({
      code: 502,
      type: 'BadGateway',
      message,
      source,
      details,
    });
  }
}
