const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middlewares/errorHandler.js");
const connectDB = require("./config/db.js");
const port = process.env.PORT || 7000;
const app = express();

//Application Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Application Routers
app.use("/api/posts", require("./routes/postRoutes"));

//Application Custom Middleware
app.use(errorHandler);

//Initiate Express Application
app.listen(port, () => {
  console.log(`Express application is running on port:${port}`);
  connectDB();
});
