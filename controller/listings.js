const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    let listings = await Listing.find().populate("owner");
    res.render("./listings/index.ejs", { listings })
}

module.exports.renderNewForm = (req, res) => {
    res.render("./listings/new.ejs")
}


module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    console.log(listing.geometry.location.coordinates);
    if (!listing) {
        req.flash("error", "This Listing does not Exist!")
        res.redirect("/listing")
    }
    res.render("./listings/show.ejs", { listing })
}

module.exports.createListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send();

    try {
        let url, filename;
        if (req.file) {
            url = req.file.path;
            filename = req.file.filename;
        } else {
            // If no file is uploaded, provide default values or handle the situation accordingly
            url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCKUbkvVbYTxHg_OQesfM8x6OoIbcMJSN3_w&usqp=CAU';
            filename = 'imageName';
        }

        let newListing = new Listing({
            title: req.body.listing.title,
            description: req.body.listing.description,
            image: { url, filename },
            price: req.body.listing.price,
            location: req.body.listing.location,
            country: req.body.listing.country,
            reviews: [],
            owner: req.user._id,
            geometry: {
                location: {
                    type: "Point", // Assuming you're dealing with point data
                    coordinates: [
                        // You need to set longitude and latitude coordinates here
                        // For example: [longitude, latitude]
                    ]
                }
            }
        });

        if (response.body.features.length > 0) {
            newListing.geometry.location.coordinates = response.body.features[0].geometry.coordinates;
        } else {
            // Handle the situation where no geocoding results are found
        } s

        let savedListing = await newListing.save();
        console.log(savedListing);
        req.flash("success", "New Listing Created!");
        res.redirect("/listing");
    } catch (error) {
        // Handle any potential errors
        console.error(error);
        req.flash("error", "Failed to create a new listing.");
        res.redirect("/listing");
    }
};


module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let editListing = await Listing.findById(id);

    res.render("./listings/edit.ejs", { listing: editListing, })
}

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file != "undefined") {
        let url = req.file.path
        let filename = req.file.filename;
        listing.image = { url, filename }
        await listing.save()
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listing/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect(`/listing`);
}