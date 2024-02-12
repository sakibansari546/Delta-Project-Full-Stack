const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");

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

router.get('/', wrapAsync(async (req, res) => {
    let listings = await Listing.find();
    res.render("./listings/index.ejs", { listings })
}));

// Create Route
router.get("/new", (req, res) => {
    res.render("./listings/new.ejs")
})

router.post("/", validateListing, wrapAsync(async (req, res, next) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listing");
}));


// Show Route
router.get('/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    // console.log(listing);
    if (!listing) {
        req.flash("error", "This Listing does not Exist!")
        res.redirect("/listing")
    }
    res.render("./listings/show.ejs", { listing })
}));




// Edit Route
router.get('/:id/edit', wrapAsync(async (req, res) => {
    let { id } = req.params;
    let editListing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing: editListing })
}));

// update Route
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    req.flash("success", "Listing Updated!");
    res.redirect(`/listing/${id}`);
}))

// Delte Route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect(`/listing`);
}))



module.exports = router;