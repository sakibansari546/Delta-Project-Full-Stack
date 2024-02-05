const mongoose = require("mongoose");
const { Schema } = mongoose;

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
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
