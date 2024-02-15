const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./review.js")


const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://thsti.res.in/public/upload/news/1594879784img.png",
        set: function (v) {
            return (v === "" || v == null) ? "https://thsti.res.in/public/upload/news/1594879784img.png" : v.toString();
        },
    },
    price: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } })
    }
})

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
