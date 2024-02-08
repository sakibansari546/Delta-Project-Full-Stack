const express = require('express');
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mongoURL = "mongodb://127.0.0.1:27017/wanderlust";
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js");
const listingSchema = require("./schema.js")

app.use(methodOverride('_method'));

const Listing = require("./models/listing.js");
const { Route } = require('express');
const { required } = require('joi');


app.engine('ejs', ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));


main().then(() => {
    console.log("connected to delta project");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongoURL);
}

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


// Define a route for the root path
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/listing', wrapAsync(async (req, res) => {
    let listings = await Listing.find();
    res.render("./listings/index.ejs", { listings })
}));

// Create Route
app.get("/listing/new", (req, res) => {
    res.render("./listings/new.ejs")
})

app.post("/listing", validateListing, wrapAsync(async (req, res, next) => {
    // if (!req.body.listing) {
    //     throw new ExpressError(400, "Send valid data for listing")
    // }

    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
}));


// Show Route
app.get('/listing/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    console.log(listing);
    res.render("./listings/show.ejs", { listing })
}));




// Edit Route
app.get('/listing/:id/edit', wrapAsync(async (req, res) => {
    let { id } = req.params;
    let editListing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing: editListing })
}));

// update Route
app.put("/listing/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    res.redirect(`/listing/${id}`);
}))

app.delete("/listing/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect(`/listing`);
}))




// Error Handling
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"))
})

app.use((err, req, res, next) => {
    let { statusCode = 404, message } = err;
    res.status(statusCode).render("./listings/error.ejs", { err });
})





// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
