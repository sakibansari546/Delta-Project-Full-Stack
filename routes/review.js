const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isLoggedIn, isOwner, isReviewAuthor } = require('../middleware.js');
const reviewController = require("../controller/review.js");


const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body)
    // console.log(result);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(404, errMsg)
    } else {
        next();
    }
}
// Review
// Post Route
router.post("/", validateReview, isLoggedIn, wrapAsync(reviewController.addReview))

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviewController.distoryReview)



module.exports = router;