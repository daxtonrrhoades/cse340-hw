// Needed resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")

// Deliver Login View to user
router.get("/login", utilities.handleErrors(accountController.buildLogin))

module.exports = router;