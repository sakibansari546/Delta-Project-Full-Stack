const Listing = require('./models/listing.js');
const Review = require('./models/review.js');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create listing! ")
        return res.redirect("/login")
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}


module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!res.locals.currUser || !listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have permission to edit!!");
        return res.redirect(`/listing/${id}`);
    }
    next()
}

module.exports.isReviewAuthorOrOwner = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    let listing = await Listing.findById(id);

    if (!res.locals.currUser || (!review.author._id.equals(res.locals.currUser._id) && !listing.owner._id.equals(res.locals.currUser._id))) {
        req.flash("error", "You don't have permission to delete!!");
        return res.redirect(`/listing/${id}`);
    }
    next();
}

