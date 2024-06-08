const mongoose = require("mongoose");

async function connectDB(url) {
    return await mongoose.connect(url).then(data => console.log("Connecting Database....")).catch(err => console.log(`${err.message}`));
}
module.exports = connectDB;