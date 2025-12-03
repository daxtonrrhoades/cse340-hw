// Needed resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build detail view for the cars
router.get("/detail/:invId", utilities.handleErrors(invController.buildVehicleDetail));

// Route to build inventory management view
router.get("/", utilities.handleErrors(invController.buildManagementView))

// Route to build management add classification view
router.get("/buildAddClassification", utilities.handleErrors(invController.buildAddClassification))

// Route to build management add inventory items view
router.get("/buildAddInventory", utilities.handleErrors(invController.buildAddInventory))

// Route to add classification to the server
router.post(
    "/addClassification",
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
)

router.post(
    "/addInventory",
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory)
)


module.exports = router;