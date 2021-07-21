const definitions = require("./swagger.json");

const swaggerConfig = {
  definitions,
  routerConfig: {
    controllers: __dirname,
  },
  uiConfig: {
    swaggerUi: `${definitions.basePath}/_docs`,
  },
};

module.exports = { swaggerConfig };
