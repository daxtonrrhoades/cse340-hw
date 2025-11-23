const utilities = require("../utilities/");

/* ***************************
 *  Create intentional error
 * ************************** */
exports.triggerError = (req, res, next) => {
    const error = new Error("Oh no! There was a crash. Maybe try a different route?");
    error.status = 500;
    throw error;
};