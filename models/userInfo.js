import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  fcm_token: { type: String, required: true },
  updated_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
