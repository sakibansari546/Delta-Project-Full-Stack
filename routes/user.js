const express = require('express');
const router = express.Router();
const User = require("../models/user.js")

const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js");
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');




router.get("/signup", (req, res) => {
    res.render("./users/signup.ejs")
})

router.post("/signup", wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({
            email, username
        });

        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) { return next() }

            req.flash("success", "Welcome to WanderLust"); // Fix: Change "Success" to "success"
            res.redirect("/listing");
        })
    } catch (error) {
        req.flash("error", error.message); // Fix: Change "Error" to "error", and "massage" to "message"
        res.redirect("/signup");
    }
}));


router.get("/login", (req, res) => {
    res.render("./users/login.ejs")
})


router.post("/login", saveRedirectUrl,
    passport.authenticate("local",
        {
            failureRedirect: "/login",
            failureFlash: true
        }),
    async (req, res) => {
        try {
            req.flash("success", "Welcome back to WanderLust!!"); // Fix: Change "Success" to "success"
            res.redirect(res.locals.redirectUrl || "/listing");
        } catch (error) {
            req.flash("error", error.message);
        }
    })

router.get('/logout', (req, res, next) => {
    req.logOut((err) => {
        return next(err)
    });
    req.flash("success", "you are logout now!");
    res.redirect('/listing')
})


module.exports = router;