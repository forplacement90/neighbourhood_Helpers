import { Issue } from "../models/issue.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { createAnalytics } from "../controllers/analytics.controller.js"; 
import { Analytics } from "../models/analyatics.model.js";

const createIssue = asyncHandler(async (req, res) => {
  const { title, description, languageId, location } = req.body;

  if (!title || !description || !languageId) {
    throw new ApiError(400, "All required fields must be provided");
  }

  const userId = req.user._id;
  let imageId = "";

   //  Upload image to Cloudinary
  if (req.file) {
    const uploadedImage = await uploadOnCloudinary(req.file.path);
    if (!uploadedImage) {
      throw new ApiError(500, "Image upload failed");
    }
    imageId = uploadedImage.public_id;
  }

  const issue = await Issue.create({
    title,
    description,
    languageId,
    location,
    imageId,
    userId,
    status: "reported",
    reportedAt: new Date()
  });

  //  Create analytics for the issue
  await createAnalytics(issue._id);

  res.status(201).json(
    new ApiResponse(201, issue, "Issue reported successfully")
  );
});

const getAllIssues = asyncHandler(async (req, res) => {
  const issues = await Issue.find()
    .populate("userId", "username email")
    .sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(200, issues, "Issues fetched successfully")
  );
});

const getIssueById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const issue = await Issue.findById(id)
    .populate("userId", "username email");

  if (!issue) {
    throw new ApiError(404, "Issue not found");
  }

  res.status(200).json(new ApiResponse(200, issue, "Issue details"));
});

const updateIssue = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const issue = await Issue.findById(id);
  if (!issue) {
    throw new ApiError(404, "Issue not found");
  }

  if (issue.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this issue");
  }

    // Handle image update
  if (req.file) {
      // Delete old image from Cloudinary
    if (issue.imageId) {
      await deleteFromCloudinary(issue.imageId);
    }

    const uploadedImage = await uploadOnCloudinary(req.file.path);
    if (!uploadedImage) {
      throw new ApiError(500, "New image upload failed");
    }
    issue.imageId = uploadedImage.public_id;
  }

  Object.assign(issue, req.body);
  await issue.save();

  res.status(200).json(
    new ApiResponse(200, issue, "Issue updated successfully")
  );
});

const deleteIssue = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const issue = await Issue.findById(id);
  if (!issue) {
    throw new ApiError(404, "Issue not found");
  }

  if (issue.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this issue");
  }

  if (issue.imageId) {
    await deleteFromCloudinary(issue.imageId);
  }

  //  Delete analytics entry when issue is deleted
  await Analytics.deleteOne({ issueId: issue._id });

  await issue.deleteOne();

  res.status(200).json(
    new ApiResponse(200, null, "Issue deleted successfully")
  );
});

export {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue
};
