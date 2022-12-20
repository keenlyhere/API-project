const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Spot, Review, SpotImage, sequelize } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");


const router = express.Router();

router.get("/", async (req, res, next) => {
    const allSpots = await Spot.findAll({

        attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'description',
            'price',
            'createdAt',
            'updatedAt',
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'],
            [sequelize.col('url'), 'previewImage']
        ],

        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: []
            }
        ],

        group: ['spot.id']


    })

    const allSpotsData = {};
    allSpotsData.Spots = allSpots;

    return res.json(allSpotsData)
})

module.exports = router;
