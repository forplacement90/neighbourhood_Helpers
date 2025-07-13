import mongoose, { Schema } from "mongoose";

const upvoteSchema = new Schema(
  {
    _id: {
      type: String,  
      required: true,
    },
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
