import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  reason: string;
  statusCode = 500;

  constructor() {
    super("Error Connection to database");
    this.reason = "Error connection to database";
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
