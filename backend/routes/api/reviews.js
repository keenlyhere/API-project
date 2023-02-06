const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require("../../db/models");

const { validateReviews } = require("../../utils/validation");

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
                attributes: ['id', 'firstName', 'lastName', 'profileImageUrl']
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

    const reviewsArray = [];

    if (!reviewsByUser.length > 0) {
        return res.json({
            message: "User has not made any reviews"
        })
    }

    reviewsByUser.forEach(review => {
        review = review.toJSON();

        if (review.Spot.SpotImages.length > 0) {
            for (let i = 0; i < review.Spot.SpotImages.length; i++) {
                if (review.Spot.SpotImages[i].preview === true) {
                    review.Spot.previewImage = review.Spot.SpotImages[i].url;
                }
            }
        } else {
            review.Spot.previewImage = "No preview images for spot";
        }

        if (!review.ReviewImages.length > 0) {
            review.ReviewImages = "No review image listed"
        }

        delete review.Spot.SpotImages;

        reviewsArray.push(review);

    })

    const reviewsByUserData = {
        Reviews: reviewsArray
    };


    return res.json(reviewsByUserData)
})

router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
    const { user } = req;
    const reviewId = req.params.reviewId;
    const { url } = req.body;

    let review = await Review.findByPk(reviewId);

    const err = {};
    if (!review) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "Review couldn't be found";
        return next(err);
    }
    if (user.id !== review.userId) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: you cannot add an image for a review that you did not write";
        return next(err);
    }

    const allImagesInReview = await ReviewImage.findAll({
        where: {
            reviewId: reviewId
        }
    })

    if (allImagesInReview.length >= 10) {
        err.status = 403;
        err.statusCode = 403;
        err.message = "Maximum number of images for this resource was reached";
        return next(err);
    }

    let addReviewImage = await review.createReviewImage({ url })

    const addReviewImageData = {
        id: addReviewImage.id,
        url: addReviewImage.url
    }

    return res.json(addReviewImageData);
})

router.put("/:reviewId", requireAuth, validateReviews, async (req, res, next) => {
    const { user } = req;

    const reviewId = req.params.reviewId;

    let updateReview = await Review.findByPk(reviewId);

    const err = {};
    if (!updateReview) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "Review couldn't be found";
        return next(err);
    }

    if (user.id !== updateReview.userId) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: not your review";
        return next(err);
    }

    const { review, stars } = req.body;

    updateReview.review = review;
    updateReview.stars = stars;


    await updateReview.save();

    return res.json(updateReview)
})

router.delete("/:reviewId", requireAuth, async (req, res, next) => {
    const { user } = req;

    const reviewId = req.params.reviewId;

    let deleteReview = await Review.findByPk(reviewId);

    const err = {};
    if (!deleteReview) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "Review couldn't be found";
        return next(err);
    }

    if (user.id !== deleteReview.userId) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden";
        return next(err);
    }

    await deleteReview.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})


module.exports = router;
