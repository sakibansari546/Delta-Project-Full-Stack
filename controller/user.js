const User = require("../models/user.js")

module.exports.renderSignUpForm = (req, res) => {
    res.render("./users/signup.ejs")
}

module.exports.signupTheUser = async (req, res, next) => {
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
}

module.exports.renderLoginForm = (req, res) => {
    res.render("./users/login.ejs")
}

module.exports.llogInTheUser = async (req, res) => {
    try {
        req.flash("success", "Welcome back to WanderLust!!"); // Fix: Change "Success" to "success"
        res.redirect(res.locals.redirectUrl || "/listing");
    } catch (error) {
        req.flash("error", error.message);
    }
}

module.exports.logOutUser = (req, res, next) => {
    req.logOut((err) => {
        return next(err)
    });
    req.flash("success", "you are logout now!");
    res.redirect('/listing')
}