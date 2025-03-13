import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Grupo 54",
      version: "1.0.0",
      description: "Documentação da API do segundo desafio",
    },
    servers: [
      {
        url: "http://localhost:3000/soat-api",
      },
    ],
  },
  apis: ["./src/adapter/infra/routes/*.ts"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export { swaggerSpecs };
