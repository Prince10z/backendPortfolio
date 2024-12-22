const express = require("express");
const routs = express.Router();
const {
  handleUpdatingData,
  handlingReadingUsers,
  handledeleteItem,
  handleDeleteAll,
} = require("../controllers/ConnectUsers.js");
routs.post("/send", handleUpdatingData);
routs.get("/read", handlingReadingUsers);
routs.delete("/delete", handledeleteItem);
routs.delete("/deleteAll", handleDeleteAll);

module.exports = routs;
