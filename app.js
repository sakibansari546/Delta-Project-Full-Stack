const express = require('express');
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mongoURL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js")

const listing = require("./routes/listing.js")
const review = require("./routes/review.js")

app.use(methodOverride('_method'));

// const { Route } = require('express');
// const { required } = require('joi');


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



const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body)
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


// Passing the Listing Route
app.use("/listing", listing);

// Passing the Review Route
app.use("/listing/:id/review", review);



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
