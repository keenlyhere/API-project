const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage, User, sequelize } = require("../../db/models");

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
router.get("/current", restoreUser, async (req, res, next) => {
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
router.post("/", restoreUser, validateNewSpot, async (req, res, next) => {
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const ownerId = user.id;

    let spot = await Spot.newSpot({ ownerId, address, city, state, country, lat, lng, name, description, price })

    spot = spot.toJSON();

    res.json(spot);

})

// POST /api/spots/:spotId/images
router.post("/:spotId/images", async (req, res, next) => {
    const spotId = req.params.spotId;

    const { url, preview } = req.body;

    let spot = await Spot.findByPk(spotId);

    if (!spot) {
        const err = {};
        err.message = "Spot couldn't be found";
        err.statusCode = 404;
        err.status = 404;
        err.title = "Not found";
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

    if (!updateSpot) {
        const err = {};
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "Spot couldn't be found";
        return next(err);
    }

    if (user.id !== updateSpot.ownerId) {
        const err = {};
        err.title = "Authorization Error";
        err.status = 401;
        err.statusCode = 401;
        err.message = "Spot doesn't belong to current user";
        return next(err);
    }

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (address) {
        updateSpot.address = address;
    }

    if (city) {
        updateSpot.city = city;
    }

    if (state) {
        updateSpot.state = state;
    }

    if (country) {
        updateSpot.country = country;
    }

    if (lat) {
        updateSpot.lat = lat;
    }

    if (lng) {
        updateSpot.lng = lng;
    }

    if (name) {
        updateSpot.name = name;
    }

    if (description) {
        updateSpot.description = description;
    }

    if (price) {
        updateSpot.price = price;
    }

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

    if (!deletedSpot) {
        const err = {};
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "Spot couldn't be found";
        return next(err);
    }

    if (user.id !== deletedSpot.ownerId) {
        const err = {};
        err.title = "Authorization Error";
        err.status = 401;
        err.statusCode = 401;
        err.message = "Spot doesn't belong to current user";
        return next(err);
    }

    await deletedSpot.destroy();
    console.log(deletedSpot)

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;
