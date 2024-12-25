import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import routs from "./routes/cUserRoutes.js";
import connectDB from "./ConnectMongoDb/connectionDB.js";

const app = express();

// Initialize Firebase with credentials
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_JSON, "base64").toString(
    "utf8"
  )
);

initializeApp({
  credential: cert(serviceAccount),
  projectId: process.env.project_id,
});

// Connect to MongoDB
connectDB(process.env.backendserver);

// Set up middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/resume", routs);

// Send Firebase message endpoint
app.post("/sendmsg", (req, res) => {
  const tokenval =
    "dyndmYtoRzWXafdLqSLC1S:APA91bFFFFiw7p90zWX-Q65ygyMqoch8-wkSQGrW99o0dLbnsiOZ9hbBah6wg3hOcJVfE77xdRDFyVaTmNARbfl0QVsChluUcrAFZhfNv4fiKDwFcVfkSJ4";
  const message = {
    notification: {
      title: "Notif",
      body: "this is the Notification",
    },
    // Replace with actual device token
    token: tokenval,
  };

  getMessaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message", response);
      return res.status(200).json({
        message: "Successfully sent message",
        token: tokenval,
      });
    })
    .catch((error) => {
      console.log("Error sending message", error);
      return res.status(400).send(error);
    });
});

// Start the server
app.listen(process.env.PORT, () => console.log("Starting Server..."));
