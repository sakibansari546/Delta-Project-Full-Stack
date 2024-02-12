





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


