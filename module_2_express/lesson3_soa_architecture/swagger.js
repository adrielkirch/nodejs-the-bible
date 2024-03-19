const swaggerJSDoc = require("swagger-jsdoc");
const routePath = __dirname + '/route.js'
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "My API Description",
  },
};

const options = {
  swaggerDefinition,
  apis: [
    routePath
  ],
 
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
