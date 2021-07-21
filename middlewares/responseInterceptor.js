const interceptor = require("express-interceptor");

module.exports = interceptor((req, res) => {
  return {
    isInterceptable: () => {
      return /application\/json/.test(res.get("Content-Type"));
    },
    intercept: (body, send) => {
      send(body);
    },
  };
});
