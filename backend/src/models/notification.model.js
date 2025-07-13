import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      trim: true
    },
    userId: {
      type: String,
      required: true,
      ref: "User"
    },
    issueId: {
      type: String,
      required: true,
      ref: "Issue"
    },
    type: {
      type: String,
      required: true,
      enum: ["upvote", "comment", "status-change", "mention", "admin"],
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false
  }
);

export const Notification = mongoose.model("Notification", notificationSchema);
