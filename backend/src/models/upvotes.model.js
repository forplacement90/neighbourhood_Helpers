import mongoose, { Schema } from "mongoose";

const upvoteSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",    
    },
    issueId: {
     type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Issue",  
    },
  },
  {
    timestamps: true,
  }
);

export const Upvote = mongoose.model("Upvote", upvoteSchema);
