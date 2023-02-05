const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require("../../db/models");

const { validateQuery, validateNewSpot, validateReviews, convertDates, validateBookings } = require("../../utils/validation");

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

    if (req.query.location) {
        query.where = {
        [Op.or]: {
                city: {
                    [Op.like]: `%${req.query.location}%`
                },
                state: {
                    [Op.like]: `%${req.query.location}%`
                },
                country: {
                    [Op.like]: `%${req.query.location}%`
                },
            }

        }
    }

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

    const err = {};
    err.errors = [];

    if (!allSpots.length) {
        err.message = "No spots to display";
        err.statusCode = 404;
        err.status = 404;
        err.title = "Not found";
        return next(err);
        // return res.json({
        //     message: "No spots to display"
        // })
    }

    const spotsArray = [];

    allSpots.forEach(spot => {
        let count = spot.Reviews.length;
        let sum = 0;
        spot = spot.toJSON();

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
                spot.previewImage = image.url

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

// GET /api/suggestions
// TO-DO: in react
router.get("/suggestions", validateQuery, async (req, res, next) => {
    const query = {
        where: {},
        attributes: [ "city", "state", "country" ]
    }

    if (req.query.location) {
        query.where = {
        [Op.or]: {
                city: {
                    [Op.like]: `%${req.query.location}%`
                },
                state: {
                    [Op.like]: `%${req.query.location}%`
                },
                country: {
                    [Op.like]: `%${req.query.location}%`
                },
            }

        }
    }

    const searchSuggestions = await Spot.findAll(query).then(suggestions => {
        console.log("search suggestions", searchSuggestions)
        res.json(suggestions)
    })
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

        spot.Reviews.forEach(review => {
            sum += review.stars
        })

        let avg = sum / count;

        if (isNaN(avg)) {
            avg = "Has not been rated yet"
        }

        spot.avgRating = avg;

        if (!spot.SpotImages.length) {
            spot.previewImage = "No image listed"
        }

        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url
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

    if (!spotsArray.length > 0) {
        return res.json({
            Spots: [{
                "message": "User has no Spots"
            }]
        })
    }

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

    res.status(201);
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
        err.message = "Forbidden: cannot add images to a Spot you do not own";
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
        err.message = "Forbidden: cannot edit a Spot that is not yours";
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
        err.message = "Forbidden: cannot delete a spot that is not yours";
        return next(err);
    }

    await deletedSpot.destroy();

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

router.post("/:spotId/reviews", requireAuth, validateReviews, async (req, res, next) => {
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

    res.status(201);
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
router.post("/:spotId/bookings", requireAuth, validateBookings, async (req, res, next) => {
    const { user } = req;
    const spotId = req.params.spotId;

    const { startDate, endDate } = req.body;

    const spot = await Spot.findByPk(spotId)

    const err = {};
    err.errors = [];
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
        err.status = 400;
        err.statusCode = 400;
        err.message = "Validation error";
        err.errors.push("Check-out date cannot be on or before check-in date");
        return next(err);
    }

    const currentDate = new Date().getTime();

    if (currentDate - startDateObj.getTime() >= 0) {
        err.status = 403;
        err.statusCode = 403;
        err.message = "Cannot create a booking in the past";
        err.errors.push("Cannot create a booking in the past")
        return next(err);
    }

    const spotBookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
    });

    if (spotBookings.length) {
        for (let i = 0; i < spotBookings.length; i++) {

            const bookingStartDateObj = convertDates(spotBookings[i].startDate);
            const bookingEndDateObj = convertDates(spotBookings[i].endDate);

            const err = {};
            err.status = 403;
            err.statusCode = 403;
            err.message = "Sorry, this spot is already booked for the specified dates";
            err.errors = [];

            if (startDateObj.getTime() >= bookingStartDateObj.getTime() && startDateObj.getTime() <= bookingEndDateObj.getTime()) {
                err.errors.push("Start date conflicts with an existing booking");
                return next(err);
            } else if (endDateObj.getTime() >= bookingStartDateObj.getTime() && endDateObj.getTime() <= bookingEndDateObj.getTime()) {
                err.errors.push("End date conflicts with an existing booking");
                return next(err)
            } else if (startDateObj.getTime() <= bookingStartDateObj.getTime()
                && endDateObj.getTime() >= bookingStartDateObj.getTime()
                || startDateObj.getTime() <= bookingEndDateObj.getTime()
                && endDateObj.getTime() >= bookingEndDateObj.getTime()) {
                    err.errors.push("Booking dates conflicts with an existing booking");
                    return next(err)
            }
        }
    }

    let newSpotBooking = await user.createBooking({ spotId, startDate, endDate });

    return res.json(newSpotBooking)

})

module.exports = router;
