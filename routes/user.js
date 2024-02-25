const express = require('express');
const router = express.Router();
const User = require("../models/user.js")

const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js");
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const userController = require("../controller/user.js");




router.get("/signup", userController.renderSignUpForm)

router.post("/signup", wrapAsync(userController.signupTheUser));


router.get("/login", userController.renderLoginForm)


router.post("/login", saveRedirectUrl,
    passport.authenticate("local",
        {
            failureRedirect: "/login",
            failureFlash: true
        }),
    userController.llogInTheUser
)

router.get('/logout', userController.logOutUser)


module.exports = router;