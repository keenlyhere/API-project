const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");

const router = express.Router();

// validateSignup middleware
// checks if req.body.email exists and if it is an email
       // if req.body.username is a min length of 4 and not an email
       // if req.body.password is not empty and a min length of 6
// if any one of those fail, return error reesponse
const validateSignup = [
    check("email", "Please provide a valid email")
        .exists({ checkFalsy: true })
        .bail()
        .isEmail(),
    check("username", "Please provide a username with at least 4 characters")
        .exists({ checkFalsy: true })
        .bail()
        .isLength({ min: 4 }),
    check("username")
        .not()
        .isEmail()
        .withMessage("Username cannot be an email"),
    check("password", "Password must be 6 characters or more")
        .exists({ checkFalsy: true })
        .bail()
        .isLength({ min: 6 }),
    check("firstName", "First Name is required")
        .exists({ checkFalsy: true }),
    check("lastName", "Last Name is required")
        .exists({ checkFalsy: true }),
    handleValidationErrors
];

// POST /api/users to sign up
router.post("/", singleMulterUpload("image"), validateSignup, async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;
    const profileImageUrl = await singlePublicFileUpload(req.file);

    console.log("backend - body:", req.body);
    console.log("backend - profilepic:", profileImageUrl);

    const existingEmail = await User.findOne({
        where: {
            email: email
        }
    })

    const existingUsername = await User.findOne({
        where: {
            username: username
        }
    })

    const err = {};
    err.status = 403;
    err.statusCode = 403;
    err.message = "User already exists"
    err.errors = [];

    // if (existingEmail && existingUsername) {
    //      err.errors = [{
    //         "email": "User with that email already exists",
    //         "username": "User with that username already exists"
    //     }]

    //     return next(err);
    // }

    if (existingEmail) {
        err.errors.push("User with that email already exists");

        return next(err);
    }

    if (existingUsername) {
        err.errors.push("User with that username already exists");

        return next(err);
    }

    const user = await User.signup({
        email,
        username,
        password,
        firstName,
        lastName,
        profileImageUrl
    });

    await setTokenCookie(res, user);

    return res.json(user);
});

// PUT /api/users to edit profile picture
router.put("/", singleMulterUpload("image"), async (req, res, next) => {
    const { user } = req;
    const { userId } = req.body;
    const profileImageUrl = await singlePublicFileUpload(req.file);

    const updateUser = await User.findByPk(userId);

    console.log("updateUser:", updateUser);
    console.log("userId:", userId);

    if (!updateUser) {
        err.status = 404;
        err.statusCode = 404;
        err.title = "Not found"
        err.message = "User couldn't be found";
        return next(err);
    }

    if (user.id !== updateUser.id) {
        err.title = "Forbidden";
        err.status = 403;
        err.statusCode = 403;
        err.message = "Forbidden: cannot edit a Spot that is not yours";
        return next(err);
    }

    updateUser.profileImageUrl = profileImageUrl;

    await updateUser.save();
    console.log("updateUser - updated:", updateUser);

    res.json(updateUser);
})

module.exports = router;
