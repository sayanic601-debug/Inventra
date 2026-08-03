const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
    openapi: "3.0.0",

    info: {
        title: "Inventra API",
        version: "1.0.0",
        description:
            "API documentation for Inventra - Electronics Retail Inventory Management System",
    },

    servers: [
        {
            url: "http://localhost:5000/api/v1",
            description: "Local Development Server",
        },
    ],

    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
};

const options = {
    definition: swaggerDefinition,

    apis: [
        "./src/routes/*.js",
    ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;