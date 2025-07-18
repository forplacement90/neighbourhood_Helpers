import mongoose, { Schema } from "mongoose";

const analyticsSchema = new Schema(
  {
    issueId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Issue",
      unique: true
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
    timestamps: {
      createdAt: true,
      updatedAt: true
    },
    versionKey: false
  }
);

export const Analytics = mongoose.model("Analytics", analyticsSchema);
