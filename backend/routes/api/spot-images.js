const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, sequelize } = require("../../db/models");

const { noExtendLeft } = require("sequelize/lib/operators");

const router = express.Router();

// DELETE /api/spot-images/:imageId
router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const { user } = req;
    const imageId = req.params.imageId;

    const deleteSpotImage = await SpotImage.findByPk(imageId, {
        include: [
            {
                model: Spot
            }
        ]
    });

    const err = {};
    if (!deleteSpotImage) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "Spot Image couldn't be found";
        return next(err);
    }

    if (deleteSpotImage.Spot.ownerId !== user.id) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: you do not have permission to delete the Spot Image";
        return next(err);
    }

    await deleteSpotImage.destroy();

    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;
