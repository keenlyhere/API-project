const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require("../../db/models");

const { check, validationResult } = require("express-validator");

const { handleValidationErrors, handleSpotValidationErrors } = require("../../utils/validation");
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

        if (booking.Spot.SpotImages.length > 0) {
            for (let i = 0; i < booking.Spot.SpotImages.length; i++) {
                if (booking.Spot.SpotImages[i].preview === true) {
                    booking.Spot.previewImage = booking.Spot.SpotImages[i].url;
                }
            }
        }

        delete booking.Spot.SpotImages;

        bookingsArray.push(booking);

    })

    const bookingsByUserData = {
        Bookings: bookingsArray
    }

    return res.json(bookingsByUserData)
})



module.exports = router;
