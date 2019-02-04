const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const flightsRoutes = require("./routes/flights");
const destinationsRoutes = require("./routes/destinations");

const app = express();

mongoose.connect('mongodb://localhost:27017/flights')
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/flights", flightsRoutes);
app.use("/api/destinations", destinationsRoutes);
app.use("/api/users", flightsRoutes);
app.use((req,res,next) => {
	res.sendFile(path.join(__dirname,"angular",index.html));
});

module.exports = app;
