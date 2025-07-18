import { Comment } from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

//  Create a comment
export const createComment = asyncHandler(async (req, res) => {
  const { issueId, content } = req.body;

  if (!issueId || !content) {
    throw new ApiError(400, "Issue ID and content are required");
  }

  const comment = await Comment.create({
    userId: req.user._id,
    issueId,
    content
  });

  res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment created successfully"));
});

//  Get all comments for a specific issue
export const getCommentsByIssue = asyncHandler(async (req, res) => {
  const { issueId } = req.params;

  const comments = await Comment.find({ issueId })
    .populate("userId", "username fullName avatar")
    .sort({ createdAt: 1 });

  res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

//  Update a comment
export const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const comment = await Comment.findById(id);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this comment");
  }

  comment.content = content || comment.content;
  await comment.save();

  res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment updated successfully"));
});

//  Delete a comment
export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this comment");
  }

  await comment.deleteOne();

  res
    .status(200)
    .json(new ApiResponse(200, null, "Comment deleted successfully"));
});
