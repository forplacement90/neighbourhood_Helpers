import mongoose, { Schema } from "mongoose";

const upvoteSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",    
    },
    issueId: {
      type: String,
      required: true,
      ref: "Issue",  
    },
  },
  {
    timestamps: true,
  }
);

export const Upvote = mongoose.model("Upvote", upvoteSchema);
