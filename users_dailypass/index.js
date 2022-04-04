const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const dailyPassRoutes = require("./routes/dailyPass");

const app = express();

dotenv.config();

mongoose
    .connect(process.env.Mongodb_url)
    .then(() => {
        console.log("Users db successfully connected!");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/daily-pass", dailyPassRoutes);

app.listen(process.env.Port, () => {
    console.log(`Users & Daily-pass microservice is listening for requests to PORT: ${process.env.Port}`);
});