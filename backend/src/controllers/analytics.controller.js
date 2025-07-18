import { Analytics } from "../models/analyatics.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Initialize analytics for a given issue (only once)
const createAnalytics = asyncHandler(async (req, res) => {
  const { issueId } = req.params;

  const exists = await Analytics.findOne({ issueId });
  if (exists) {
    throw new ApiError(400, "Analytics already initialized for this issue");
  }

  const analytics = await Analytics.create({
    issueId,
    upvoteCount: 0,
    commentCount: 0,
  });

  res.status(201).json(
    new ApiResponse(201, analytics, "Analytics initialized")
  );
});

// Increment upvote count
const incrementUpvote = asyncHandler(async (req, res) => {
  const { issueId } = req.params;

  const analytics = await Analytics.findOneAndUpdate(
    { issueId },
    { $inc: { upvoteCount: 1 } },
    { new: true }
  );

  if (!analytics) throw new ApiError(404, "Analytics not found");

  res
    .status(200)
    .json(new ApiResponse(200, analytics, "Upvote count incremented"));
});

// Increment comment count
const incrementComment = asyncHandler(async (req, res) => {
  const { issueId } = req.params;

  const analytics = await Analytics.findOneAndUpdate(
    { issueId },
    { $inc: { commentCount: 1 } },
    { new: true }
  );

  if (!analytics) throw new ApiError(404, "Analytics not found");

  res
    .status(200)
    .json(new ApiResponse(200, analytics, "Comment count incremented"));
});

// Get analytics by issue ID
const getAnalytics = asyncHandler(async (req, res) => {
  const { issueId } = req.params;

  const analytics = await Analytics.findOne({ issueId });

  if (!analytics) {
    throw new ApiError(404, "Analytics not found");
  }

  res.status(200).json(
    new ApiResponse(200, analytics, "Analytics fetched successfully")
  );
});

export {
  createAnalytics,
  incrementUpvote,
  incrementComment,
  getAnalytics,
};
