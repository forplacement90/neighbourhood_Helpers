import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    createdBy: {
      type: String,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false
  }
);

export const Event = mongoose.model("Event", eventSchema);
