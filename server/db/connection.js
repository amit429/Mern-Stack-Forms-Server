const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars


const db = process.env.DATABASE

mongoose.connect(db , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log("Not connected to database", err);
})