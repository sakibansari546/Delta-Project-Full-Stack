





// app.get("/getcookie", (req, res) => {
//     res.cookie("Greet", "Hello!", { signed: true });
//     res.cookie("Made in", "India!", { signed: true });

//     console.log(req.cookies)

//     // Cookies that have been signed
//     console.log('Signed Cookies: ', req.signedCookies)
//     res.send("send some cookies");
// })

// const sessionOptions = { secret: "secretcode", resave: false, saveUninitialized: true }
// app.use(session(sessionOptions))
// app.use(flash());
// // app.get('/test', (req, res) => {
// //     res.send("Test working")
// // })

// // app.get("/reqcount", (req, res) => {
// //     if (req.session.count) {
// //         req.session.count++;
// //     }
// //     else {
// //         req.session.count = 1
// //     }
// //     res.send(`You sent a req ${req.session.count} times!`);
// // })
// app.use((req, res, next) => {
//     res.locals.successMsg = req.flash("success");
//     res.locals.errorMsg = req.flash("error");
//     next();
// });

// app.get("/register", (req, res) => {
//     let { name = "random" } = req.query;
//     req.session.name = name;
//     if (name === "random") {
//         req.flash('error', 'user not registered!');
//     } else {
//         req.flash('success', name + ' registered!');
//     }
//     // Redirect to /hello after setting the flash message
//     res.redirect(`/hello`);
// });

// app.get('/hello', (req, res) => {
//     // Note: Corrected the variable names in the render function
//     res.render("./listings/example.ejs", { name: req.session.name, successMsg: res.locals.successMsg, errorMsg: res.locals.errorMsg });
// });





<div class="row row-cols-lg-4 rew-cols-md-3 row-cols-sm-2">
    <% listings.forEach(listing=> { %>
    <a class="z-1" href="/listing/<%= listing._id %>">
        <div class="card col mb-5 z-2">
            <img class="" src="<%= listing.image.url %>"
                style="height: 18rem; border-radius: 0 !important; z-index: -1 !important;"
                class="card-img-top rounded-0" alt="listing Image">
            <div class="card-body bg-white z-3">
                <h4 class="fw-bold">@<%= listing.owner.username %>
                </h4>
                <h5 class="card-title">
                    <%= listing.title %>
                </h5>
                <p class="card-text">
                    <b>&#8377;<%= listing && listing.price ? listing.price.toLocaleString("en-IN")
                            : 'N/A' %></b>&nbsp;<span>Night</span>
                </p>
            </div>
        </div>
    </a>
    <% }); %>
</div>