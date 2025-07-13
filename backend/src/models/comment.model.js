import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
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
    content: {
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

export const Comment = mongoose.model("Comment", commentSchema);
