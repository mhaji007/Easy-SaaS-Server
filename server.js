const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

// Import routes


// Initialize app
const app = express();


// Global middlewares (to be used on all routes)
app.use(morgan("dev"));

// JSON data's limit by default is 1mb
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: "true" }));
app.use(cookieParser());


// Wildcard cors - any domain has access
// to the application
app.use(cors());

// Restrict cors - only specified domains
// have access to the application
// app.use(cors({ origin: process.env.CLIENT_URL }));

// Route middlewares

const port = process.env.PORT || 9090;

app.listen(port, () => console.log(`Server is running on port ${port}`));
