import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
      trim: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    uploadedBy: {
      type: String,
      required: true,
      ref: "User"
    }
  },
  {
    versionKey: false
  }
);

export const Image = mongoose.model("Image", imageSchema);
