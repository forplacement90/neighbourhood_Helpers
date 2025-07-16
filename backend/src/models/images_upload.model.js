import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema(
  {
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
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    versionKey: false
  }
);

export const Image = mongoose.model("Image", imageSchema);
