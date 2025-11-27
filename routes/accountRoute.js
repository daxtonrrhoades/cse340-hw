// Needed resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")

// Deliver Login View to user
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Deliver an account registration view to the user
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// post registration form submission
router.post('/register', utilities.handleErrors(accountController.registerAccount))

module.exports = router;