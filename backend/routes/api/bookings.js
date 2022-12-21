const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require("../../db/models");

const { check, validationResult } = require("express-validator");

const { handleValidationErrors, handleSpotValidationErrors, convertDates } = require("../../utils/validation");
const { noExtendLeft } = require("sequelize/lib/operators");

const router = express.Router();

const validateReviews = [
    check("review")
        .notEmpty()
        .withMessage("Review text is required"),
    check("stars")
        .notEmpty()
        .isInt({ min: 0, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

// GET /api/bookings/current
router.get("/current", requireAuth, async (req, res, next) => {
    const { user } = req;

    const bookingsByUser = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: SpotImage,
                        attributes: ['preview', 'url']
                    }
                ]
            }
        ]
    })

    // console.log(bookingsByUser)

    const bookingsArray = [];

    bookingsByUser.forEach(booking => {
        booking = booking.toJSON();

        console.log(booking.Spot)

        if (booking.Spot.SpotImages.length > 0) {
            for (let i = 0; i < booking.Spot.SpotImages.length; i++) {
                if (booking.Spot.SpotImages[i].preview === true) {
                    booking.Spot.previewImage = booking.Spot.SpotImages[i].url;
                }
            }
        }

        if (!booking.Spot.previewImage) {
            booking.Spot.previewImage = "No image listed"
        }

        delete booking.Spot.SpotImages;

        bookingsArray.push(booking);

    })

    const bookingsByUserData = {
        Bookings: bookingsArray
    }

    return res.json(bookingsByUserData)
})

// PUT /api/bookings/:bookingId
router.put("/:bookingId", requireAuth, async (req, res, next) => {
    const { user } = req;
    const bookingId = req.params.bookingId;
    const { startDate, endDate } = req.body;

    const updateBooking = await Booking.findByPk(bookingId);

    const err = {};

    if (!updateBooking) {
        err.message = "Booking couldn't be found";
        err.statusCode = 404;
        err.status = 404;
        err.title = "Not found";
        return next(err);
    }

    if (updateBooking.userId !== user.id) {
        console.log("update", updateBooking.userId);
        console.log("user", user.id);
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: not your booking";
        return next(err);
    }

    const currentDate = new Date().getTime();

    const [ bookingStartDateObj, bookingEndDateObj ] = convertDates(updateBooking.startDate, updateBooking.endDate);
    if (currentDate - bookingEndDateObj.getTime() >= 0) {
        err.status = 403;
        err.statusCode = 403;
        err.message = "Past bookings can't be modified";
        return next(err);
    }

    const [ startDateObj, endDateObj ] = convertDates(startDate, endDate);

    if ((endDateObj.getTime() - startDateObj.getTime()) <= 0) {
        err.status = 400;
        err.statusCode = 400;
        err.message = "Validation error";
        err.errors = ["endDate cannot be on or before startDate"];
        return next(err);
    }

    const spotBookings = await Booking.findAll({
        where: {
            spotId: updateBooking.spotId
        }
    });

    if (spotBookings.length) {
        for (let i = 0; i < spotBookings.length; i++) {

            const [ bookingStartDateObj, bookingEndDateObj ] = convertDates(spotBookings[i].startDate, spotBookings[i].endDate);
            console.log("BOOKINGSTARTDATEOBJ", bookingStartDateObj);
            console.log("STARTDATEOBJ", startDateObj);
            console.log("BOOKINGENDDATEOBJ", bookingEndDateObj);
            console.log("ENDDATEOBJ", endDateObj);

            const err = {};

            if (startDateObj.getTime() >= bookingStartDateObj.getTime() && startDateObj.getTime() <= bookingEndDateObj.getTime()) {
                console.log("ERROR LINE 608")

                err.status = 403;
                err.statusCode = 403;
                err.message = "Sorry, this spot is already booked for the specified dates";
                err.errors = ["Start date conflicts with an existing booking"];
                return next(err);
            }

            if (endDateObj.getTime() >= bookingStartDateObj.getTime() && endDateObj.getTime() <= bookingEndDateObj.getTime()) {
                console.log("ERROR LINE 618")
                err.status = 403;
                err.statusCode = 403;
                err.message = "Sorry, this spot is already booked for the specified dates";
                err.errors = ["End date conflicts with an existing booking"];
                return next(err);
            }

        }
    }

    updateBooking.startDate = startDate;
    updateBooking.endDate = endDate;

    await updateBooking.save();

    res.json(updateBooking)

})

// DELETE /api/bookings/:bookingId
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
    const { user } = req;
    const bookingId = req.params.bookingId;

    const deletedBooking = await Booking.findByPk(bookingId);

    const err = {};

    if (!deletedBooking) {
        err.message = "Booking couldn't be found";
        err.statusCode = 404;
        err.status = 404;
        err.title = "Not found";
        return next(err);
    }

    if (deletedBooking.userId !== user.id) {
        console.log("delete", deletedBooking.userId);
        console.log("user", user.id);
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: not your booking";
        return next(err);
    }

    const currentDate = new Date().getTime();

    const [ bookingStartDateObj, bookingEndDateObj ] = convertDates(deletedBooking.startDate, deletedBooking.endDate);

    if (currentDate - bookingStartDateObj.getTime() >= 0) {
        err.status = 403;
        err.statusCode = 403;
        err.message = "Bookings that have been started can't be deleted";
        return next(err);
    }

    await deletedBooking.destroy();
    console.log(deletedBooking)

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
})

module.exports = router;
