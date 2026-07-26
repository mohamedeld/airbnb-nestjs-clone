import { IErrorResponse } from '../error-response.interface';

export abstract class BaseCustomException extends Error {
  abstract status: number;
  protected constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
  formatError(): IErrorResponse[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
