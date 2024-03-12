const express = require('express');
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require('../middleware.js');

const User = require("../models/user.js");

const listingController = require("../controller/listings.js");

const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Validate Schema Middleware
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, errMsg);
    } else {
        next();
    }
};

// Index Route
router.get('/', wrapAsync(listingController.index));

// Search Route
router.get('/search', wrapAsync(async (req, res) => {
    const { country } = req.query;
    let listings;

    if (!country) {
        listings = await Listing.find().populate("owner");
    } else {
        listings = await Listing.find({ country }).populate("owner");
    }

    res.render("./listings/index.ejs", { listings });
}));

// Create Route
router.get("/new", isLoggedIn, listingController.renderNewForm);
router.post("/", isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.createListing));

// Show Route
router.get('/:id', wrapAsync(listingController.showListing));

// Edit Route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
router.put("/:id", isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.editListing));

// Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;
