import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Dairy Farm Production Management API",
            version: "1.0.0",
            description: "API for managing milk production of a dairy farmers",
        },
    },
    apis: ["./src/infra/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;