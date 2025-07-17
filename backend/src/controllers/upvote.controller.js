import mongoose from "mongoose";
import { Upvote } from "../models/upvotes.model.js";
import { Issue } from "../models/issue.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Helper: Validate Mongo ObjectId safely
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(String(id).trim());

const createUpvote = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { issueId } = req.body;

  if (!isValidObjectId(issueId)) {
    throw new ApiError(400, "Invalid issue ID format");
  }

  const issue = await Issue.findById(issueId);
  if (!issue) {
    throw new ApiError(404, "Issue not found");
  }

  const alreadyUpvoted = await Upvote.findOne({ userId, issueId: issue._id });
  if (alreadyUpvoted) {
    throw new ApiError(400, "Already upvoted");
  }

  const upvote = await Upvote.create({ userId, issueId: issue._id });
  issue.upvoteCount += 1;
  await issue.save();

  res.status(201).json(new ApiResponse(201, upvote, "Upvote created successfully"));
});

const deleteUpvote = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { issueId } = req.body;

  if (!isValidObjectId(issueId)) {
    throw new ApiError(400, "Invalid issue ID format");
  }

  const issue = await Issue.findById(issueId);
  if (!issue) {
    throw new ApiError(404, "Issue not found");
  }

  const deleted = await Upvote.findOneAndDelete({ userId, issueId: issue._id });
  if (!deleted) {
    throw new ApiError(404, "Upvote not found");
  }

  issue.upvoteCount = Math.max(0, issue.upvoteCount - 1);
  await issue.save();

  res.status(200).json(new ApiResponse(200, null, "Upvote removed successfully"));
});

const getUpvotesByIssue = asyncHandler(async (req, res) => {
  const { issueId } = req.params;

  if (!isValidObjectId(issueId)) {
    throw new ApiError(400, "Invalid issue ID format");
  }

  const upvotes = await Upvote.find({ issueId }).populate("userId", "name email");
  res.status(200).json(new ApiResponse(200, upvotes, "Upvotes fetched successfully"));
});

const hasUserUpvoted = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { issueId } = req.params;

  if (!isValidObjectId(issueId)) {
    throw new ApiError(400, "Invalid issue ID format");
  }

  const exists = await Upvote.exists({ userId, issueId });
  res.status(200).json(new ApiResponse(200, { upvoted: !!exists }, "Upvote check complete"));
});

export {
  createUpvote,
  deleteUpvote,
  getUpvotesByIssue,
  hasUserUpvoted,
};
