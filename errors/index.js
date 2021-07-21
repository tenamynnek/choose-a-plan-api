const ERROR_CODE = require("./code");

class BaseError extends Error {
  constructor(statusCode, errorCode, message = "") {
    super(message);
    this.name = this.constructor.name;
    this.code = errorCode;
    this.statusCode = statusCode;
    this.traceCode = Date.now();
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }

  toJson() {
    return {
      errorCode: this.code,
      traceCode: this.traceCode,
      ...(this.message && { errorMsg: this.message }),
    };
  }
}

class UnknownServerError extends BaseError {
  constructor(msg, code = ERROR_CODE.SYSTEM.UNKNOWN) {
    super(500, code, msg);
  }
}

class GeneralSystemError extends BaseError {
  constructor(msg, code = ERROR_CODE.SYSTEM.GENERAL) {
    super(401, code, msg);
  }
}

class SchemaError extends BaseError {
  constructor(code, msg) {
    super(401, code, msg);
  }
}

module.exports = {
  BaseError,
  UnknownServerError,
  SchemaError,
  GeneralSystemError,
  ERROR_CODE,
};
