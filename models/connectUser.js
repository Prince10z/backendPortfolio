const mongoose = require("mongoose");
const connectSchema = new mongoose.Schema({
    Fullname: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        match: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/
    }, Msg: {
        type: String,
        required: true
    }
}, { timestamps: true });
const cUserData = mongoose.model("ConnectUsers", connectSchema);
module.exports = cUserData;