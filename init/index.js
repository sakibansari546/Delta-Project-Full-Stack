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
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj, index) => {
            if (obj.geometry && obj.geometry.location && obj.geometry.location.coordinates) {
                return {
                    ...obj,
                    owner: "65d1dd79e048df199f1ec0bc",
                    geometry: {
                        location: {
                            type: 'Point',
                            coordinates: obj.geometry.location.coordinates
                        }
                    }
                };
            } else {
                console.error(`Invalid data object at index ${index}:`, obj);
                return null;
            }
        }).filter(Boolean);

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
