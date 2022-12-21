const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require("../../db/models");

const { check, validationResult } = require("express-validator");

const { handleValidationErrors, handleSpotValidationErrors, validateQuery, validateNewSpot, validateNewReviews, convertDates } = require("../../utils/validation");

const { Op } = require("sequelize");

const router = express.Router();

// GET /api/spots
router.get("/", validateQuery, async (req, res, next) => {

    const query = {
        where: {},
        include: [
            {
                model: Review,
                attributes: ['stars'],
            },
            {
                model: SpotImage,
                attributes: ['url', 'preview'],
            }
        ]
    }

    let page = req.query.page === undefined ? 1 : parseInt(req.query.page);
    let size = req.query.size === undefined ? 20 : parseInt(req.query.size);

    if (page > 10) {
        page = 10;
    }

    if (size > 20) {
        size = 20;
    }

    query.limit = size;
    query.offset = size * (page - 1);

    if (req.query.maxLat && !req.query.minLat) {
        query.where.lat = {
            [Op.lte]: req.query.maxLat
        }
    }

    if (req.query.minLat && !req.query.maxLat) {
        query.where.lat = {
            [Op.gte]: req.query.minLat
        }
    }

    if (req.query.maxLat && req.query.minLat) {
        query.where.lat = {
            [Op.and]: {
                [Op.lte]: req.query.maxLat,
                [Op.gte]: req.query.minLat
            }
        }
    }

    if (req.query.maxLng && !req.query.minLng) {
        query.where.lng = {
            [Op.lte]: req.query.maxLng
        }
    }

    if (req.query.minLng && !req.query.maxLng) {
        query.where.lng = {
            [Op.gte]: req.query.minLng
        }
    }

    if (req.query.maxLng && req.query.minLng) {
        query.where.lng = {
            [Op.and]: {
                [Op.lte]: req.query.maxLng,
                [Op.gte]: req.query.minLng
            }
        }
    }

    if (req.query.maxPrice && !req.query.minPrice) {
        query.where.price = {
            [Op.lte]: req.query.maxPrice
        }
    }

    if (req.query.minPrice && !req.query.maxPrice) {
        query.where.price = {
            [Op.gte]: req.query.minPrice
        }
    }

    if (req.query.minPrice && req.query.maxPrice) {
        query.where.price = {
            [Op.and]: {
                [Op.lte]: req.query.maxPrice,
                [Op.gte]: req.query.minPrice
            }
        }
    }

    const allSpots = await Spot.findAll(query)

    if (!allSpots.length) {
        return res.json({
            message: "No spots to display"
        })
    }

    const spotsArray = [];

    allSpots.forEach(spot => {
        let count = spot.Reviews.length;
        let sum = 0;
        spot = spot.toJSON();

        console.log(spot)

        spot.Reviews.forEach(review => {
            sum += review.stars
        })

        let avg = sum / count;

        if (isNaN(avg)) {
            avg = "Has not been rated yet"
        }

        spot.avgRating = avg;

        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                // console.log("preview = true")
                spot.previewImage = image.url
                // console.log(image.url)
            } else {
                spot.previewImage = "No image listed"
            }
        })

        if (spot.SpotImages.length === 0) {
            spot.previewImage = "No image listed";
        }

        const spotData = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: spot.avgRating,
            previewImage: spot.previewImage
        }

        spotsArray.push(spotData)
    })


    const allSpotsData = {
        Spots: spotsArray,
        page: page,
        size: size
    };


    return res.json(allSpotsData)
})


// GET /api/spots/current
router.get("/current", requireAuth, async (req, res, next) => {
    const { user } = req;

    const spotsByUser = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        include: [
            {
                model: Review,
                attributes: ['stars'],
            },
            {
                model: SpotImage,
                attributes: ['url', 'preview'],
            }
        ],
    })

    const spotsArray = [];

    spotsByUser.forEach(spot => {
        let count = spot.Reviews.length;
        let sum = 0;
        spot = spot.toJSON();

        console.log(spot)

        spot.Reviews.forEach(review => {
            sum += review.stars
        })

        let avg = sum / count;

        if (isNaN(avg)) {
            avg = "Has not been rated yet"
        }

        spot.avgRating = avg;

        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                // console.log("preview = true")
                spot.previewImage = image.url
                // console.log(image.url)
            } else {
                spot.previewImage = "No image listed"
            }
        })

        const spotData = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: spot.avgRating,
            previewImage: spot.previewImage
        }

        spotsArray.push(spotData)
    })


    const spotsByUserData = {
        Spots: spotsArray
    };


    return res.json(spotsByUserData)
})


// GET /:spotId
router.get("/:spotId", async (req, res, next) => {
    const spotId = req.params.spotId;

    let spotById = await Spot.findByPk(spotId);

    if (!spotById) {
        const err = {};
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "Spot couldn't be found";
        return next(err);
    }

    spotById = spotById.toJSON();

    const count = await Review.count({
        where: {
            spotId: spotId
        }
    });

    spotById.numReviews = count;

    const sum = await Review.sum('stars', {
        where: {
            spotId: spotId
        }
    })

    let avg = sum / count;

    if (isNaN(avg)) {
        avg = "Has not been rated yet"
    }

    spotById.avgStarRating = avg;

    const spotImages = await SpotImage.findAll({
        where: {
            spotId: spotId
        },
        attributes: ['id', 'url', 'preview']
    })

    if (!spotImages.length > 0) {
        spotById.SpotImages = "No images for spot"
    } else {
        spotById.SpotImages = spotImages
    }

    spotById.Owner =  await User.findByPk(spotById.ownerId, {
        attributes: {
            exclude: ['username']
        }
    })


    res.json(spotById);
})


// POST /api/spots
router.post("/", requireAuth, validateNewSpot, async (req, res, next) => {
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    let spot = await user.createSpot({ address, city, state, country, lat, lng, name, description, price })

    spot = spot.toJSON();

    res.json(spot);

})

// POST /api/spots/:spotId/images
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
    const { user } = req;
    const spotId = req.params.spotId;

    const { url, preview } = req.body;

    let spot = await Spot.findByPk(spotId);

    const err = {};
    if (!spot) {
        err.message = "Spot couldn't be found";
        err.statusCode = 404;
        err.status = 404;
        err.title = "Not found";
        return next(err);
    }

    if (user.id !== spot.ownerId) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden";
        return next(err);
    }

    let newSpotImage = await SpotImage.newSpotImage({ spotId, url, preview })

    res.json(newSpotImage);
})

// PUT /api/spots/:spotId
router.put("/:spotId", requireAuth, validateNewSpot, async (req, res, next) => {
    const { user } = req;
    const spotId = req.params.spotId;

    const updateSpot = await Spot.findByPk(spotId);

    const err = {};
    if (!updateSpot) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "Spot couldn't be found";
        return next(err);
    }

    if (user.id !== updateSpot.ownerId) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden";
        return next(err);
    }

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    updateSpot.address = address;
    updateSpot.city = city;
    updateSpot.state = state;
    updateSpot.country = country;
    updateSpot.lat = lat;
    updateSpot.lng = lng;
    updateSpot.name = name;
    updateSpot.description = description;
    updateSpot.price = price;

    await updateSpot.save();

    res.json(updateSpot)
})

router.delete("/:spotId", requireAuth, async (req, res, next) => {
    const { user } = req;

    const spotId = req.params.spotId;

    const deletedSpot = await Spot.findOne({
        where: {
            id: spotId
        }
    });

    console.log(deletedSpot);

    const err = {};
    if (!deletedSpot) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "Spot couldn't be found";
        return next(err);
    }

    if (user.id !== deletedSpot.ownerId) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden";
        return next(err);
    }

    await deletedSpot.destroy();
    console.log(deletedSpot)

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

router.get("/:spotId/reviews", async (req, res, next) => {
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId);

    const err = {};
    if (!spot) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "Spot couldn't be found";
        return next(err);
    }

    const spotReviews = await spot.getReviews({
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    if (!spotReviews.length > 0) {
        return res.json({
            message: "No reviews for current spot"
        })
    }


    const spotReviewsArray = [];

    spotReviews.forEach(spotReview => {
        spotReview = spotReview.toJSON();

        if (spotReview.ReviewImages.length > 0) {
            for (let i = 0; i < spotReview.ReviewImages.length; i++) {
                if (!spotReview.ReviewImages[i].url) {
                    spotReview.ReviewImages[i].url = "No image listed"
                    console.log(spotReview.ReviewImages[i].url)
                }
            }
        } else {
            spotReview.ReviewImages = "No review images for spot"
        }

        spotReviewsArray.push(spotReview);
    })

    return res.json({
        "Reviews": spotReviewsArray
    });
})

router.post("/:spotId/reviews", requireAuth, validateNewReviews, async (req, res, next) => {
    const { user } = req;
    const spotId = req.params.spotId;

    const { review, stars } = req.body;

    const spot = await Spot.findByPk(spotId)


    const reviewByUser = await Review.findOne({
        where: {
            userId: user.id,
            spotId: spotId
        }
    })

    const err = {};
    if (!spot) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "Spot couldn't be found";
        return next(err);
    }

    if (reviewByUser) {
        err.status = 403;
        err.statusCode = 403;
        err.message = "User already has a review for this spot";
        return next(err);
    }

    let spotReview = await user.createReview({ spotId, review, stars });

    // spotReview = spotReview.toJSON();
    // console.log(spotReview)
    return res.json(spotReview)


})

// GET /api/spots/:spotId/bookings
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
    const { user } = req;
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId);

    const err = {};
    if (!spot) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "Spot couldn't be found";
        return next(err);
    }

    console.log(spot)

    const spotBookingsArray = [];
    if (spot.ownerId !== user.id) {
        const spotBookings = await spot.getBookings({
            attributes: ['spotId', 'startDate', 'endDate']
        });

        spotBookings.forEach(spotBooking => {
            spotBooking = spotBooking.toJSON();

            spotBookingsArray.push(spotBooking);
        })

        return res.json({
            "Bookings": spotBookingsArray
        });
    } else {
        const spotBookings = await spot.getBookings({
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        })

        if (!spotBookings.length > 0) {
            return res.json({
                message: "No bookings for current spot"
            })
        }

        spotBookings.forEach(spotBooking => {
            spotBooking = spotBooking.toJSON();

            spotBookingsArray.push(spotBooking);
        })

        return res.json({
            "Bookings": spotBookingsArray
        })
    }
})

// POST /api/spots/:spotId/bookings
router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
    const { user } = req;
    const spotId = req.params.spotId;

    const { startDate, endDate } = req.body;

    // console.log("start", startDate);
    // console.log("end", endDate)

    const spot = await Spot.findByPk(spotId)

    const err = {};
    if (!spot) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "Spot couldn't be found";
        return next(err);
    }

    if (spot.ownerId === user.id) {
        err.status = 403;
        err.statusCode = 403;
        err.message = "You cannot book your own spot";
        return next(err);
    }

    const startDateObj = convertDates(startDate)
    const endDateObj = convertDates(endDate);

    if ((endDateObj.getTime() - startDateObj.getTime()) <= 0) {
        console.log("ERROR LINE 587")
        err.status = 400;
        err.statusCode = 400;
        err.message = "Validation error";
        err.errors = ["endDate cannot be on or before startDate"];
        return next(err);
    }

    const spotBookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
    });

    if (spotBookings.length) {
        for (let i = 0; i < spotBookings.length; i++) {

            const bookingStartDateObj = convertDates(spotBookings[i].startDate)
            const bookingEndDateObj = convertDates(spotBookings[i].endDate);
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

            if (startDateObj.getTime() <= bookingStartDateObj.getTime()
                && endDateObj.getTime() >= bookingStartDateObj.getTime()
                || startDateObj.getTime() <= bookingEndDateObj.getTime()
                && endDateObj.getTime() >= bookingEndDateObj.getTime()) {

                err.status = 403;
                err.statusCode = 403;
                err.message = "Sorry, this spot is already booked for the specified dates";
                err.errors = ["Booking dates conflicts with an existing booking"];
                return next(err);
            }


        }
    }

    let newSpotBooking = await user.createBooking({ spotId, startDate, endDate });

    return res.json(newSpotBooking)

})

module.exports = router;
