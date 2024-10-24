type DefaultErrorsType =
  | 'ValidationError'
  | 'Unauthorized'
  | 'UnexpectedError'
  | 'NotFound'
  | 'BadRequest'
  | 'BadGateway'
  | 'InternalServerError';

export type ApiError = {
  type: DefaultErrorsType;
  code: number;
  message?: string;
  source?: string;
  details?: any;
  friendlyMessage?: string;
};

export class CustomError extends Error {
  public readonly apiError: ApiError;

  constructor(apiError: ApiError) {
    super(apiError.message);
    this.apiError = apiError;
  }
}
