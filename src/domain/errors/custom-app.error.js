export class CustomError extends Error {
  constructor(apiError) {
    super(apiError.message);
    this.apiError = apiError;
  }
}
