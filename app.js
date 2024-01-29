const express = require('express');
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mongoURL = "mongodb://127.0.0.1:27017/wanderlust";

app.use(methodOverride('_method'));

const Listing = require("./models/listing.js");

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

// Define a route for the root path
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/listing', async (req, res) => {
    let listings = await Listing.find();
    // console.log(listings);
    res.render("./listings/index.ejs", { listings })
});

app.get("/listing/new", (req, res) => {
    res.render("./listings/new.ejs")
})

app.get('/listing/:id', async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    console.log(listing);
    res.render("./listings/show.ejs", { listing })
});

app.post("/listing", async (req, res) => {
    let newListing = await new Listing(req.body.listing)
    // let newListing = await new Listing({ title: title, description: description, price, price, location: location, country: country });
    newListing.save();
    res.redirect("/listing");
})

app.get('/listing/:id/edit', async (req, res) => {
    let { id } = req.params;
    let editListing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing: editListing })
});

app.put("/listing/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    res.redirect(`/listing/${id}`);
})

app.delete("/listing/:id", async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect(`/listing`);
})




// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
