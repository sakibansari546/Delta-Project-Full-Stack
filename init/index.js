const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const mongoURL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected to delta project");
    } catch (err) {
        console.error("Error connecting to the database:", err);
        throw err;
    }
}

async function initDB() {
    try {
        // Uncomment the following line if you want to delete existing data before inserting new data
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj) => ({ ...obj, owner: "65ce4fd576781e61d9ffaa16" }))
        await Listing.insertMany(initData.data);
        console.log("Data added");
    } catch (err) {
        console.error("Error initializing database:", err);
    } finally {
        await mongoose.disconnect();
    }
}

// Call main function to connect to the database
main().then(() => {
    // After connecting, initialize the database
    initDB();
}).catch(err => console.log(err));
