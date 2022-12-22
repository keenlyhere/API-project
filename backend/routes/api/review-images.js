const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Review, ReviewImage, sequelize } = require("../../db/models");

const { noExtendLeft } = require("sequelize/lib/operators");

const router = express.Router();

// DELETE /api/review-images/:imageId
router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const { user } = req;
    const imageId = req.params.imageId;

    const deleteReviewImage = await ReviewImage.findByPk(imageId, {
        include: [
            {
                model: Review
            }
        ]
    });

    const err = {};
    if (!deleteReviewImage) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "Review Image couldn't be found";
        return next(err);
    }

    if (deleteReviewImage.Review.userId !== user.id) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: you do not have permissions to delete the Review Image";
        return next(err);
    }

    await deleteReviewImage.destroy();

    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;
