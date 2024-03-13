if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}
console.log(process.env.SECRET) // remove this after you've confirmed it is working

const express = require('express');
const app = express();
const port = 8080;

const mongoose = require("mongoose");
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const mongoURL = "mongodb://127.0.0.1:27017/wanderlust";
const ExpressError = require("./utils/ExpressError.js");

const listingRoute = require("./routes/listing.js");
const reviewRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js");

const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const Listing = require("./models/listing.js");

const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js");
const { isLoggedIn } = require('./middleware.js');

app.use(cookieParser("secretcode"));

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


const sessionOptions = {
    secret: "secretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    }
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
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });


app.use(session(sessionOptions));
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next()
})

// app.get("/demouser", async (req, res) => {
//     let fakeuser = new User({
//         email: "fa   ke@gmail.com",
//         username: "Fake user"
//     });
//     let registedUser = await User.register(fakeuser, "fakepassword")
//     res.send(registedUser);
// })

// Passing the Listing Route
app.use("/listing", listingRoute);



// Passing the Review Route
app.use("/listing/:id/review", reviewRoute);

// Pssing the user Route
app.use("/", userRoute);



app.get('/listing/profile/:id', isLoggedIn, async (req, res) => {
    try {
        // Fetch the user's information based on the ID in the URL
        const user = await User.findById(req.params.id);

        // Fetch listings owned by the user
        const listings = await Listing.find({ owner: req.params.id }).populate("owner");

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('./listings/profile.ejs', { user, listings });
    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).send('Internal Server Error');
    }
});





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
    console.log(`Server is running on http://localhost:${port}/listing`);
});
