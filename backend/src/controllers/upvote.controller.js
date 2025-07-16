import mongoose from "mongoose";
import { Upvote } from "../models/upvotes.model.js";
import { Issue } from "../models/issue.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create Upvote
const createUpvote = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { issueId } = req.body;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(issueId)) {
    throw new ApiError(400, "Invalid issue ID");
  }

  // Check if issue exists
  const issue = await Issue.findById(issueId);
  if (!issue) {
    throw new ApiError(404, "Issue not found");
  }

  // Check if already upvoted
  const alreadyExists = await Upvote.findOne({ userId, issueId });
  if (alreadyExists) {
    throw new ApiError(400, "User has already upvoted this issue");
  }

  // Create upvote
  const upvote = await Upvote.create({ userId, issueId });

  // Optionally update upvoteCount
  issue.upvoteCount += 1;
  await issue.save();

  res
    .status(201)
    .json(new ApiResponse(201, upvote, "Upvote created successfully"));
});

// Delete Upvote
const deleteUpvote = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { issueId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(issueId)) {
    throw new ApiError(400, "Invalid issue ID");
  }

  const deleted = await Upvote.findOneAndDelete({ userId, issueId });

  if (!deleted) {
    throw new ApiError(404, "Upvote not found");
  }

  // Optionally decrement upvoteCount
  await Issue.findByIdAndUpdate(issueId, { $inc: { upvoteCount: -1 } });

  res
    .status(200)
    .json(new ApiResponse(200, null, "Upvote removed successfully"));
});

// Get All Upvotes by Issue
const getUpvotesByIssue = asyncHandler(async (req, res) => {
  const { issueId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(issueId)) {
    throw new ApiError(400, "Invalid issue ID");
  }

  const upvotes = await Upvote.find({ issueId }).populate("userId", "name email");

  res
    .status(200)
    .json(new ApiResponse(200, upvotes, "Upvotes fetched successfully"));
});

// Check if the Logged-in User has Upvoted the Issue
const hasUserUpvoted = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { issueId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(issueId)) {
    throw new ApiError(400, "Invalid issue ID");
  }

  const exists = await Upvote.exists({ userId, issueId });

  res
    .status(200)
    .json(
      new ApiResponse(200, { upvoted: !!exists }, "Upvote check complete")
    );
});

export {
  createUpvote,
  deleteUpvote,
  getUpvotesByIssue,
  hasUserUpvoted,
};
