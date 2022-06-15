export class NotFoundException extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

export class BusinessException extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BusinessException.prototype);
  }
}
