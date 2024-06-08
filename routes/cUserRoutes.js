const express = require("express");
const routs = express.Router();
const { handleUpdatingData, handlingReadingUsers } = require("../controllers/ConnectUsers");
routs.post('/send', handleUpdatingData);
routs.get("/read", handlingReadingUsers);
module.exports = routs;
