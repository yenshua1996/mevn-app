const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middlewares/errorHandler.js");
const port = process.env.PORT || 7000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/posts", require("./routes/postRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Express application is running on port:${port}`);
});
