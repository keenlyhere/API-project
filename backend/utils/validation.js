const { validationResult } = require("express-validator");
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
        err.message = "Validation Error";
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

const convertDates = (startDate, endDate) => {
    console.log("CONVERT DATES")

    const [ startYear, startMonth, startDay ] = startDate.split("-");
    const [ endYear, endMonth, endDay ] = endDate.split("-");

    console.log(startMonth);
    console.log(endMonth);

    const startMonthIndex = startMonth - 1;
    const endMonthIndex = endMonth - 1;

    const startDateObj = new Date(startYear, startMonthIndex, startDay);
    const endDateObj = new Date(endYear, endMonthIndex, endDay);

    return [ startDateObj, endDateObj ]
}

module.exports = {
    handleValidationErrors,
    handleSpotValidationErrors,
    convertDates
}
