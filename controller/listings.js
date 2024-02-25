const Listing = require("../models/listing.js");

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
    console.log(listing);
    if (!listing) {
        req.flash("error", "This Listing does not Exist!")
        res.redirect("/listing")
    }
    res.render("./listings/show.ejs", { listing })
}

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path
    let filename = req.file.filename;
    console.log('url.fil', url, filename)
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename }
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listing");
}

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