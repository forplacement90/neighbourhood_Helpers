import mongoose, { Schema } from "mongoose";

const analyticsSchema = new Schema(
  {
    issueId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Issue"
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
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
