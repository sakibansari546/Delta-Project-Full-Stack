const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.addReview = async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review)
    newReview.author = req.user._id;
    console.log('newReview', newReview)
    listing.reviews.push(newReview);

    req.flash("success", "New Review Created!");
    await newReview.save()
    await listing.save()

    // console.log("new Review Save");
    res.redirect(`/listing/${listing._id}`);
}

module.exports.distoryReview = async (req, res) => {
    let { id, reviewId } = req.params;
    Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!");
    res.redirect(`/listing/${id}`)
}