const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const routers = require("./routers/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Роути писати під цим коментом

app.use("/api/users", routers.users);

// Route for books
app.use("/api/books", routers.books);

app.use("/api/trainings", routers.trainings);

// app.use("/api/results", routers.results);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
