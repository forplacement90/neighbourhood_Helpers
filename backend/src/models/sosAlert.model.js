import mongoose from "mongoose";

const sosAlertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: "I need immediate help!",
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export const SOSAlert = mongoose.model("SOSAlert", sosAlertSchema);
