const swagger = require("swagger-tools");

const generateMiddlewares = (swaggerConfig, extra = []) =>
  new Promise((resolve) => {
    swagger.initializeMiddleware(swaggerConfig.definitions, (middleware) => {
      const middlewareList = [];
      middlewareList.push(middleware.swaggerMetadata());
      middlewareList.push(
        middleware.swaggerValidator({ validateResponse: true })
      );
      extra.forEach((m) => {
        middlewareList.push(m);
      });
      middlewareList.push(middleware.swaggerRouter(swaggerConfig.routerConfig));
      // if (config.get("env") !== "production") {
      //   middlewareList.push(middleware.swaggerUi());
      // }

      resolve(middlewareList);
    });
  });

module.exports = { generateMiddlewares };
