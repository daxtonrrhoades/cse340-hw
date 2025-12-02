// Needed resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require("../utilities/account-validation")

// Deliver Login View to user
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Deliver an account registration view to the user
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// post registration form submission and process registration data
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
    "/login",
    (req, res) => {
        res.status(200).send("login process")
    }
)

module.exports = router;