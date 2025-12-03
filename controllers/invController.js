const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    try {
        const classification_id = req.params.classificationId
        const data = await invModel.getInventoryByClassificationId(classification_id)
        const grid = await utilities.buildClassificationGrid(data)
        let nav = await utilities.getNav()
        const className = data[0].classification_name
        res.render("./inventory/classification", {
            title: className + " vehicles",
            nav,
            grid,
        })
    } catch (error) {
        next(error)
    }
}

/* ***************************
 *  Build detail view for car inventory
 * ************************** */
invCont.buildVehicleDetail = async function (req, res, next) {
    const inv_id = req.params.invId;

    try {
        const vehicle = await invModel.getInventoryById(inv_id);
        let nav = await utilities.getNav();

        if (!vehicle) {
            return res.status(404).render("errors/error", {
                title: err.status || "Vehicle Not Found",
                message: "No vehicle found. Must be off fighting the Decepticons.",
                nav,
            });
        }

        const vehicleDetailHTML = await utilities.buildVehicleDetailHTML(vehicle);        

        res.render("./inventory/detail", {
            title: `${vehicle.inv_make} ${vehicle.inv_model}`,
            nav,
            vehicleDetailHTML,
        });
    } catch (error) {
        next(error);
    }
};

/* ***************************
 *  Build Management view
 * ************************** */
invCont.buildManagementView = async (req, res, next) => {
    let nav = await utilities.getNav()
    res.render("inventory/management", {
        title: "Management",
        nav,
        errors: null,
    })
}

/* ***************************
 *  Build Add Classification view
 * ************************** */
invCont.buildAddClassification = async (req, res, next) => {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: null,
    })
}

/* ***************************
 *  Add new classification
 * ************************** */
invCont.addClassification = async (req, res, next) => {
    let nav = await utilities.getNav()
    const { classification_name } = req.body
    


    try {
        const result = await invModel.addClassification(classification_name)

        if (result) {
            let nav = await utilities.getNav()
            req.flash("success", `${classification_name} was added successfully`)
            return res.render("inventory/management", {
                title: "Management",
                nav,
                errors: null,
            })
        }
    } catch (error) {
        let nav = await utilities.getNav()
        req.flash("error", "Sorry, that classification could not be added.")
        return res.render("inventory/add-classification", {
            title: "Add Classification",
            nav,
            errors: null,
        })
    }
}

module.exports = invCont