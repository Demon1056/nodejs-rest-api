const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { validateBody } = require("./middleware/contacts_middleware");

const contactsRouter = require("./routes/api/contacts");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  if (error.status) {
    return res.status(error.status).json({
      message: error.message,
    });
  }
  return res.status(500).json({
    message: "Internal server error",
  });
});

module.exports = app;
