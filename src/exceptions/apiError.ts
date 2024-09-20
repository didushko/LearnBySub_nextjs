import { ZodError, ZodIssue } from "zod";

export default class ApiError extends Error {
  status: number;
  authError: boolean = false;
  errors: Error[] | ZodIssue[];

  constructor(
    status: number,
    message: string,
    errors: Error[] | ZodIssue[] = []
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static unauthorizeError() {
    return new ApiError(401, "User unauthorized");
  }

  static needActivateError() {
    return new ApiError(401, "User need activate account");
  }

  static badRequest(message: string, errors?: Error[] | ZodIssue[]) {
    return new ApiError(400, message, errors);
  }

  static wrongLoginOrPassword() {
    return new ApiError(400, "Wrong email or password", [
      {
        code: "invalid_string",
        validation: "email",
        message: "Wrong email or password",
        path: ["email", "password"],
      },
    ]);
  }
}
