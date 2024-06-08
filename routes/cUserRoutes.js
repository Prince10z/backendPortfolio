const express = require("express");
const routs = express.Router();
const { handleUpdatingData, handlingReadingUsers, handledeleteItem } = require("../controllers/ConnectUsers");
routs.post('/send', handleUpdatingData);
routs.get("/read", handlingReadingUsers);
routs.delete("/delete", handledeleteItem);

module.exports = routs;
