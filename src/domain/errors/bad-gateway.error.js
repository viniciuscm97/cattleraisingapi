import { CustomError } from './custom-app.error.js';

export class BadGatewayError extends CustomError {
  constructor(message, source, details) {
    super({
      code: 502,
      type: 'BadGateway',
      message,
      source,
      details,
    });
  }
}
