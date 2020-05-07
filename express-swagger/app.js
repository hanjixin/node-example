const exprss = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const app = exprss();

let userRouter = require("./routes/user");
app.use("/users", userRouter);

var options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "swagger-ui",
      version: "1.0.0",
      author: "Hank",
      description: "项目描述",
    },
    externalDocs: {
      description: "Find out more about Swagger",
      url: "http://swagger.io",
    },
  },
  schemes: ["https", "http"],
  //   swaggerOptions: {
  //     url: "http://petstore.swagger.io/v2/swagger.json",
  //   },
  apis: [path.join(__dirname, "/routes/*.js")],
};
var swaggerSpec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log("app is listen port 3000");
});
