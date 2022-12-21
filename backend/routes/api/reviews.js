const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require("../../db/models");

const { check, validationResult } = require("express-validator");

const { handleValidationErrors, handleSpotValidationErrors } = require("../../utils/validation");

const router = express.Router();

// get all reviews of current user
// GET /api/reviews/current
router.get("/current", requireAuth, async (req, res, next) => {

    const { user } = req;

    const reviewsByUser = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: SpotImage,
                        attributes: ['preview', 'url']
                    },
                ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            },

        ],
    })

    // console.log(reviewsByUser)
    const reviewsArray = [];

    reviewsByUser.forEach(review => {
        review = review.toJSON();

        if (review.Spot.SpotImages.length > 0) {
            for (let i = 0; i < review.Spot.SpotImages.length; i++) {
                if (review.Spot.SpotImages[i].preview === true) {
                    review.Spot.previewImage = review.Spot.SpotImages[i].url;
                    console.log(review.Spot.previewImage)
                }
            }
        }

        if (!review.Spot.previewImage) {
            review.Spot.previewImage = "No image listed"
        }

        delete review.Spot.SpotImages;

        if (review.ReviewImages.length > 0) {
            for (let i = 0; i < review.ReviewImages.length; i++) {
                if (!review.ReviewImages[i].url) {
                    review.ReviewImages[i].url = "No image listed";
                    console.log(review.ReviewImages[i].url)
                }
            }
        }

        reviewsArray.push(review);

    })

    const reviewsByUserData = {
        Reviews: reviewsArray
    };


    return res.json(reviewsByUserData)
})


module.exports = router;
