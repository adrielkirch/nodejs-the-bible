const swaggerJSDoc = require("swagger-jsdoc");
const routePath = `${__dirname}/route.js`;
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "User Service Oriented Architecture",
    version: "1.0.0",
    description:
      "Implementing a Service-Oriented Architecture (SOA), layered architecture with a fake JSON database to simulate authentication.",
  },
  basePath: "/",
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: [routePath],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
