const R = require("ramda");
const E = require("../errors");

module.exports = {
  generalErrorHandler(err, req, res, next) {
    let e;
    if (err && err instanceof E.BaseError) {
      e = err;
    } else {
      e = new E.UnknownServerError(err.message);
    }
    console.log(e);
    res.status(e.statusCode).json(e.toJson());
  },
  swaggerErrorHandler(err, req, res, next) {
    if (err.failedValidation) {
      let message = R.pipe(
        R.pathOr([], ["results", "errors"]),
        R.map(R.prop(["message"])),
        R.join(".")
      )(err);
      message = message ? `[${err.message}] ${message}` : err.message;

      const e = new E.SchemaError(E.ERROR_CODE.SCHEMA.VALIDATION, message);
      return next(e);
    }

    if (res.statusCode === 405) {
      return next(new E.SchemaError(E.ERROR_CODE.SCHEMA.METHOD_NOW_ALLOW));
    }

    return next(err);
  },
};
