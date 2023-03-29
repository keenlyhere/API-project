const { check, validationResult } = require("express-validator");
const { noExtendLeft } = require("sequelize/lib/operators");

// middleware for formatting errors from express-validator middleware
// can be customized (see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    // console.log("hit handleValidationErrors")
    const validationErrors = validationResult(req);
        // console.log("backend - err.errors", validationErrors);

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
    check("minPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Minimum price must be greater than or equal to 0"),
    check("maxPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Maximum price must be greater than or equal to 0"),
    check("page")
        .optional()
        .isInt({ min: 1})
        .withMessage("Page must be greater than or equal to 1"),
    check("size")
        .optional()
        .isInt({ min: 1})
        .withMessage("Size must be greater than or equal to 1"),
    check("maxLat")
        .optional()
        .isDecimal()
        .withMessage("Maximum latitude is not valid"),
    check("minLat")
        .optional()
        .isDecimal()
        .withMessage("Minimum latitude is not valid"),
    check("maxLng")
        .optional()
        .isDecimal()
        .withMessage("Maximum longitude is not valid"),
    check("minLng")
        .optional()
        .isDecimal()
        .withMessage("Minimum longitude is not valid"),
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
        .withMessage("Name must be less than 50 characters")
        .notEmpty()
        .withMessage("Name is required"),
    check("description")
        .notEmpty()
        .withMessage("Description is required"),
    check("price")
        .isInt({ min: 1})
        .withMessage("Price must be greater than 0")
        .isInt({ max: 10000 })
        .withMessage("Price cannot be greater than $10,000")
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

const validateBookings = [
    check("startDate")
        .notEmpty()
        .withMessage("Please enter a start date"),
    check("endDate")
        .notEmpty()
        .withMessage("Please enter an end date"),
    handleValidationErrors
]

module.exports = {
    handleValidationErrors,
    handleSpotValidationErrors,
    convertDates,
    validateQuery,
    validateNewSpot,
    validateReviews,
    validateBookings
}
