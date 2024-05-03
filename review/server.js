require("dotenv").config();
const User = require("./models/User"); // This is just for introducing the User model to the application
const Product = require("./models/Product"); // This is just for introducing the User model to the application
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const reviewRoutes = require("./routes/reviewRoutes");

// express app
const app = express();

// middleware
app.use(express.json());

// cors
app.use(cors());

// Health check
app.get("/", (req, res) => {
  res.send("Review service is up and running");
});

// Routes
app.use("/review", reviewRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
