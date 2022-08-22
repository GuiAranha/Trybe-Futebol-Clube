export default class BaseError extends Error {
  constructor(public code: number, public message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
}
