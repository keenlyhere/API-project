const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Booking, sequelize } = require("../../db/models");

const { convertDates } = require("../../utils/validation");
const { noExtendLeft } = require("sequelize/lib/operators");

const router = express.Router();

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

    const bookingsArray = [];

    bookingsByUser.forEach(booking => {
        booking = booking.toJSON();

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

        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: not your booking";
        return next(err);
    }

    const currentDate = new Date().getTime();

    const bookingStartDateObj = convertDates(updateBooking.startDate);
    const bookingEndDateObj = convertDates(updateBooking.endDate);
    if (currentDate - bookingEndDateObj.getTime() >= 0) {
        err.status = 403;
        err.statusCode = 403;
        err.message = "Past bookings can't be modified";
        return next(err);
    }

    const startDateObj = convertDates(startDate);
    const endDateObj = convertDates(endDate);

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

            if (spotBookings[i].id !== updateBooking.id) {

                const spotBookingStartDateObj = convertDates(spotBookings[i].startDate)
                const spotBookingEndDateObj = convertDates(spotBookings[i].endDate);

                const err = {};
                err.status = 403;
                err.statusCode = 403;
                err.message = "Sorry, this spot is already booked for the specified dates";

                if (startDateObj.getTime() >= spotBookingStartDateObj.getTime() && startDateObj.getTime() <= spotBookingEndDateObj.getTime()) {
                    err.errors = [{ "startDate": "Start date conflicts with an existing booking" }];
                    return next(err);
                }

                if (endDateObj.getTime() >= spotBookingStartDateObj.getTime() && endDateObj.getTime() <= spotBookingEndDateObj.getTime()) {
                    err.errors = [{ "endDate": "End date conflicts with an existing booking" }];
                    return next(err);
                }

                if (startDateObj.getTime() <= spotBookingStartDateObj.getTime()
                    && endDateObj.getTime() >= spotBookingStartDateObj.getTime()
                    || startDateObj.getTime() <= spotBookingEndDateObj.getTime()
                    && endDateObj.getTime() >= spotBookingEndDateObj.getTime()) {

                    err.errors = [{ "Booking conflict": "Booking dates conflicts with an existing booking" }];
                    return next(err);
                }
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

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
})

module.exports = router;
