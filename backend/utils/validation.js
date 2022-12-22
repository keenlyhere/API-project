const { check, validationResult } = require("express-validator");
const { noExtendLeft } = require("sequelize/lib/operators");

// middleware for formatting errors from express-validator middleware
// can be customized (see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    // if there are errors
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors
            .array()
            .map((error) => `${error.msg}`);

        // const err = Error("Bad request.");
        const err = {};
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        err.message = "Validation error";
        err.statusCode = 400;
        next(err);
    }

    next();
}

const handleSpotValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    // if there are errors
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors
            .array()
            .map((error) => `${error.msg}`);

        const err = {};
        err.errors = errors;
        err.status = 400;
        err.statusCode = 400;
        err.title = "Bad request.";
        err.message = "Validation Error"
        next(err);
    }

    next();
}

const convertDates = (date) => {

    const [ year, month, day ] = date.split("-");

    const monthIndex = month - 1;

    const dateObj = new Date(year, monthIndex, day);

    return dateObj;
}

const validateQuery = [
    check("page")
        .optional({nullable: true})
        .isInt({ min: 1})
        .withMessage("Page must be greater than or equal to 1"),
    check("size")
        .optional({nullable: true})
        .isInt({ min: 1})
        .withMessage("Size must be greater than or equal to 1"),
    check("maxLat")
        .optional({nullable: true})
        .isDecimal()
        .withMessage("Maximum latitude is not valid"),
    check("minLat")
        .optional({nullable: true})
        .isDecimal()
        .withMessage("Minimum latitude is not valid"),
    check("maxLng")
        .optional({nullable: true})
        .isDecimal()
        .withMessage("Maximum longitude is not valid"),
    check("minLng")
        .optional({nullable: true})
        .isDecimal()
        .withMessage("Minimum longitude is not valid"),
    check("minPrice")
        .optional({nullable: true})
        .isDecimal({ min: 0 })
        .withMessage("Minimum price must be greater than or equal to 0"),
    check("maxPrice")
        .optional({nullable: true})
        .isDecimal({ min: 0 })
        .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors
];

// validate new spot middleware
const validateNewSpot = [
    check("address")
        .notEmpty()
        .withMessage("Street address is required"),
    check("city")
        .notEmpty()
        .withMessage("City is required"),
    check("state")
        .notEmpty()
        .withMessage("State is required"),
    check("country")
        .notEmpty()
        .withMessage("Country is required"),
    check("lat", "Latitude is not valid")
        .notEmpty()
        .bail()
        .isDecimal(),
    check("lng", "Longitude is not valid")
        .notEmpty()
        .bail()
        .isDecimal(),
    check("name")
        .isLength({ max: 50 })
        .notEmpty()
        .withMessage("Name is required"),
    check("description")
        .notEmpty()
        .withMessage("Description is required"),
    check("price")
        .notEmpty()
        .withMessage("Price per day is required"),
    handleSpotValidationErrors
];

const validateReviews = [
    check("review")
        .notEmpty()
        .withMessage("Review text is required"),
    check("stars", "Stars must be an integer from 1 to 5")
        .notEmpty()
        .bail()
        .isInt({ min: 0, max: 5 }),
    handleValidationErrors
];

module.exports = {
    handleValidationErrors,
    handleSpotValidationErrors,
    convertDates,
    validateQuery,
    validateNewSpot,
    validateReviews

}
