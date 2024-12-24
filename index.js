//TODO: To complete this firebase messaging from https://youtu.be/J8j_jzWPRtw?si=a32oeke8kdSxq5ry

// var admin = require("firebase-admin");
import dotenv from "dotenv";
dotenv.config();
import express, { json, response } from "express";
import cors from "cors";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import routs from "./routes/cUserRoutes.js";
import connectDB from "./ConnectMongoDb/connectionDB.js";
const app = express();
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_JSON, "base64").toString(
    "utf8"
  )
);

initializeApp({
  credential: cert(serviceAccount),
  projectId: process.env.project_id,
});
connectDB(process.env.backendserver);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/resume", routs);
app.post("/sendmsg", (req, res) => {
  // const recievedToken = req.body.fcmToken;
  const message = {
    notification: {
      title: "Notif",
      body: "this is the Notification",
    },
    //FIXME: To change the device token
    token:
      "fPST2aKeSHS8CzVLGmZybN:APA91bHVqyPDizJOmw3RAQos59k9Vjf-Hz3ZWkhROyyl6gmbfdCDuCA260Y6l521MEIo4vcUOcQVwF9Hr4nSoYggw81fUSC510Gk20Nk4Oqf6bk7LS0xDXg",
  };
  getMessaging()
    .send(message)
    .then((response) => {
      console.log("Successfully send massage", response);
      return res.status(200).json({
        message: "Successfully sent message",
        token:
          "fPST2aKeSHS8CzVLGmZybN:APA91bHVqyPDizJOmw3RAQos59k9Vjf-Hz3ZWkhROyyl6gmbfdCDuCA260Y6l521MEIo4vcUOcQVwF9Hr4nSoYggw81fUSC510Gk20Nk4Oqf6bk7LS0xDXg",
      });
    })
    .catch((error) => {
      console.log("Error sending message", error);
      return res.status(400).send(error);
    });
});
app.listen(process.env.PORT, () => console.log("Starting Server..."));
