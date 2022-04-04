const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const contentRoutes = require("./routes/content");

const app = express();

dotenv.config();

mongoose
    .connect(process.env.Mongodb_url)
    .then(() => {
        console.log("Content db successfully connected!");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use("/", contentRoutes);

app.listen(process.env.Port, () => {
    console.log(`Content microservice is listening for requests to PORT: ${process.env.Port}`);
});