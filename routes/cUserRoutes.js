import express from "express";
const routs = express.Router();
import {
  handleUpdatingData,
  handlingReadingUsers,
  handledeleteItem,
  handleDeleteAll,
  makeserverlive,
} from "../controllers/ConnectUsers.js";
routs.get("/liveServer", makeserverlive);
routs.post("/send", handleUpdatingData);
routs.get("/read", handlingReadingUsers);
routs.delete("/delete", handledeleteItem);
routs.delete("/deleteAll", handleDeleteAll);
export default routs;
