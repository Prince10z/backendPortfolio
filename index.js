require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors');
const connectDB = require("./ConnectMongoDb/connectionDB");
const routs = require("./routes/cUserRoutes");
connectDB(process.env.backendserver); app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/resume", routs);
app.listen(process.env.PORT, () => console.log("Starting Server..."));
