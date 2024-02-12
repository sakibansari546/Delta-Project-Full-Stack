const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


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
router.post("/", validateReview, wrapAsync(async (req, res, next) => {

    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review)

    listing.reviews.push(newReview);

    req.flash("success", "New Review Created!");
    await newReview.save()
    await listing.save()

    // console.log("new Review Save");
    res.redirect(`/listing/${listing._id}`);
}))

router.delete("/:reviewId", async (req, res) => {
    let { id, reviewId } = req.params;
    Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!");
    res.redirect(`/listing/${id}`)
})




module.exports = router;