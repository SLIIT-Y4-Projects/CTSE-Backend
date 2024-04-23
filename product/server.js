require("dotenv").config();
const User = require("./models/User"); // This is just for introducing the User model to the application
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const productRoutes = require("./routes/productRoutes");

// express app
const app = express();

// middleware
app.use(express.json());

// cors
app.use(cors());

// Routes
app.use("/", productRoutes);

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
