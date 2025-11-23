const express = require("express");
const errorRouter = express.Router();
const errorController = require("../controllers/errorController");

// Route to get and trigger intentional error from footer link
errorRouter.get("/trigger-error", errorController.triggerError);

module.exports = errorRouter;