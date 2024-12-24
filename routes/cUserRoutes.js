import express from "express";
const routs = express.Router();
import {
  handleUpdatingData,
  handlingReadingUsers,
  handledeleteItem,
  handleDeleteAll,
} from "../controllers/ConnectUsers.js";
routs.post("/send", handleUpdatingData);
routs.get("/read", handlingReadingUsers);
routs.delete("/delete", handledeleteItem);
routs.delete("/deleteAll", handleDeleteAll);
export default routs;
