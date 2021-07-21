const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const responseInterceptor = require("../middlewares/responseInterceptor");
const {
  generalErrorHandler,
  swaggerErrorHandler,
} = require("../middlewares/errorHandler");
const { generateMiddlewares } = require("../middlewares/swagger");
const { swaggerConfig } = require("../routes/api");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../routes/api/swagger.json");

const createApiApp = async () => {
  const app = express();

  app.use(bodyParser.json({ limit: "2MB" }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());

  app.use(cors());

  app.use(responseInterceptor);

  app.use("/ping", async (req, res, next) => {
    res.status(200).json("pong");
  });

  const routerSwaggerMiddles = await generateMiddlewares(swaggerConfig);
  app.use(routerSwaggerMiddles);

  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  app.use(swaggerErrorHandler);
  app.use(generalErrorHandler);

  return app;
};

module.exports = createApiApp;
