import mongoose, { Schema } from "mongoose";

const issueSchema = new Schema(
  {
    _id: {
      type: String, 
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    categoryId: {
      type: String,
      required: true,
      ref: "Category"
    },
    userId: {
      type: String,
      required: true,
      ref: "User"
    },
    status: {
      type: String,
      required: true,
      enum: ["reported", "verified", "in-progress", "resolved"],
      default: "reported"
    },
    imageId: {
      type: String, // Could be a Cloudinary ID or URL
      ref: "Image"
    },
    location: {
      type: String
    },
    reportedAt: {
      type: Date,
      default: Date.now
    },
    verifiedAt: {
      type: Date
    },
    inProgressAt: {
      type: Date
    },
    resolvedAt: {
      type: Date
    },
    upvoteCount: {
      type: Number,
      default: 0
    },
    commentCount: {
      type: Number,
      default: 0
    },
    languageId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true  
  }
);

export const Issue = mongoose.model("Issue", issueSchema);
