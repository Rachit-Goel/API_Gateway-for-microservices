const express = require("express");
const proxy = require("express-http-proxy");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/users", proxy(`http://${process.env.BASE_URLu}:5001`), function (err){
    if(err) console.log(`Error while passing through Gateway: ${err}`);
    else 
    console.log("Gateway passed the request to service at localhost:5001/users");
});

app.use("/content", proxy(`http://${process.env.BASE_URLc}:5002`), function (err){
    if(err) console.log(`Error while passing through Gateway: ${err}`);
    else 
    console.log("Gateway passed the request to service at localhost:5002/content");
});

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc)
);

app.listen(process.env.Port || 3000, () => {
  console.log(
    `Gateway server is listening requests at localhost:${process.env.Port || 3000}`
  );
});
