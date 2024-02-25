const express = require('express');
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js");

const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require('../middleware.js');

const listingController = require("../controller/listings.js");

const multer = require('multer')
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })


// Validate Schema Middleware
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body)
    // console.log(result);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(404, errMsg)
    } else {
        next();
    }
}
// Index Route
router.get('/', wrapAsync(listingController.index));

// Create Route
router.get("/new", isLoggedIn, listingController.renderNewForm)

router.post("/", isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.createListing));




// Show Route
router.get('/:id', wrapAsync(listingController.showListing));




// Edit Route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// update Route
router.put("/:id", isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.editListing));


// Delte Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))



module.exports = router;