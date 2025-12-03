// Needed resources
const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

// server side validation for adding classifications
validate.classificationRules = () => {
    return [
        body("classification_name")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .isAlpha()
            .withMessage("Please provide a valid classification name."),
    ]
}

// Server side validation for adding inventory items
validate.inventoryRules = () => {
    return [
        body("inv_make")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a valid vehicle make."),
        
        body("inv_model")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a valid vehicle model."),
        
        body("inv_year")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 4, max: 4 })
            .isNumeric()
            .withMessage("Please provide a valid year."),
        
        body("inv_description")
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a valid description of the vehicle."),
        
        body("inv_image")
            .trim()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a valid image path."),
        
        body("inv_thumbnail")
            .trim()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a valid thumbnail image path."),
        
        body("inv_price")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .isFloat({ min: 0 })
            .withMessage("Please provide a valid dollar amount, decimals allowed"),
        
        body("inv_miles")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .isNumeric()
            .withMessage("Please provide a valid amount of miles"),
        
        body("inv_color")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .isAlpha()
            .withMessage("Please provide a valid color."),
        
        body("classification_id")
            .notEmpty()
            .isInt()
            .withMessage("Please choose a valid classification"),
    ]
}

// check classification data and return errors or continue to add the classification
validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            errors,
            title: "Add Classification",
            nav,
            classification_name,
        })
        return
    }
    next()
}

// check inventory data and return errors or continue adding invenotry item
validate.checkInventoryData = async (req, res, next) => {
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        let classificationList = await utilities.buildClassificationList()
        res.render("inventory/add-inventory", {
            errors,
            title: "Add Inventory",
            nav,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
            classification_id,
            classificationList,
        })
        return
    }
    next()
}

module.exports = validate