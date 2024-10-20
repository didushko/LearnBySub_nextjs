export default class LexyError extends Error {
  error: Error | undefined;

  constructor(message: string, error?: Error) {
    super(message);
    this.error = error;
  }

  static ErrorWhenAScan(e: Error) {
    return new LexyError(`Error when scan subtitle`, e);
  }
}
