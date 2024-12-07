const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const feedRoutes = require("./routes/feed");

app.use("/feed", feedRoutes);

mongoose
  .connect('mongodb+srv://jordin:password%40123@cluster0.q8wxp.mongodb.net/messages?retryWrites=true&w=majority&appName=Cluster0')
  .then((result) => app.listen(8080))
  .catch((err) => console.log(err));
