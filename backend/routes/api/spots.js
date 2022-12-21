const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require("../../db/models");

const { check, validationResult } = require("express-validator");

const { handleValidationErrors, handleSpotValidationErrors } = require("../../utils/validation");

const router = express.Router();



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
    check("lat")
        .notEmpty()
        .isDecimal()
        .withMessage("Latitude is not valid"),
    check("lng")
        .notEmpty()
        .isDecimal()
        .withMessage("Longitude is not valid"),
    check("name")
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

const validateNewReviews = [
    check("review")
        .notEmpty()
        .withMessage("Review text is required"),
    check("stars")
        .notEmpty()
        .isInt({ min: 0, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

// GET /api/spots
router.get("/", async (req, res, next) => {
    const allSpots = await Spot.findAll({
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
        Spots: spotsArray
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

    spotById.SpotImages = await SpotImage.findAll({
        where: {
            spotId: spotId
        },
        attributes: ['id', 'url', 'preview']
    })

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

    const spotReviewsArray = [];

    spotReviews.forEach(spotReview => {
        spotReview = spotReview.toJSON();

        // if (spotReview.ReviewImages.length > 0) {
        //     for (let i = 0; i < spotReview.ReviewImages.length; i++) {
        //         if (!spotReview.ReviewImages[i].url) {
        //             spotReview.ReviewImages[i].url = "No image listed"
        //             // console.log(spotReview.ReviewImages[i].url)
        //         }
        //     }
        // }

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

    if (reviewByUser) {
        const err = {};
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


module.exports = router;
