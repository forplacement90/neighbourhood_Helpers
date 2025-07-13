import mongoose, { Schema } from "mongoose";

const analyticsSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      trim: true
    },
    issueId: {
      type: String,
      required: true,
      ref: "Issue"
    },
    categoryId: {
      type: String,
      required: true,
      ref: "Category"
    },
    upvoteCount: {
      type: Number,
      default: 0
    },
    commentCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false
  }
);

export const Analytics = mongoose.model("Analytics", analyticsSchema);
