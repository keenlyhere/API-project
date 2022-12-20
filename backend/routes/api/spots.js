const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Spot, Review, SpotImage, sequelize } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");


const router = express.Router();

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

    // console.log(spotsArray)

    const allSpotsData = {
        Spots: spotsArray
    };


    return res.json(allSpotsData)
})

module.exports = router;
