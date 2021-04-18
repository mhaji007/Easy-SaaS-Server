const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose")
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");


// Initialize app
const app = express();

// Connect to databse
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to the Database"))
  .catch((err) => console.log("Database connection error", err));


// Global middlewares (to be used on all routes)
app.use(compression())
app.use(morgan("dev"));

// JSON data's limit by default is 1mb
app.use(bodyParser.json({ limit: "5mb" }));
// app.use(bodyParser.urlencoded({ limit: "5mb", extended: "true" }));
app.use(cookieParser());


// Wildcard cors - any domain has access
// to the application
app.use(cors());

// Restrict cors - only specified domains
// have access to the application
// app.use(cors({ origin: process.env.CLIENT_URL }));

// Route middlewares
app.use("/api", authRoutes);

const port = process.env.PORT || 9090;

app.listen(port, () => console.log(`Server is running on port ${port}`));

// Add uncaught exception handler (errors that are not handled by any funciton)
// will reach here are logged (to be handled later)
process.on("uncaughtException", error => {
  console.log("uncaughtException")
  console.log("error", error)
})
