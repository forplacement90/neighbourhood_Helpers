import { Notification } from "../models/notification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new Notification
const createNotification = asyncHandler(async (req, res) => {
  const { userId, issueId, type, message } = req.body;

  if (!userId || !issueId || !type || !message) {
    throw new ApiError(
      400,
      "All fields (userId, issueId, type, message) are required"
    );
  }

  const notification = await Notification.create({
    userId,
    issueId,
    type,
    message,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, notification, "Notification created successfully")
    );
});

//  Get all notifications for a user
const getNotificationsByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const notifications = await Notification.find({ userId })
    .populate("issueId", "title status")
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        notifications,
        "User notifications fetched successfully"
      )
    );
});

//  Delete a single notification
const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findById(id);
  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  if (notification.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to delete this notification"
    );
  }

  await notification.deleteOne();

  res
    .status(200)
    .json(new ApiResponse(200, null, "Notification deleted successfully"));
});

// Clear all notifications for a user
const clearAllNotifications = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await Notification.deleteMany({ userId });

  res.status(200).json(new ApiResponse(200, null, "All notifications cleared"));
});

export {
  createNotification,
  getNotificationsByUser,
  deleteNotification,
  clearAllNotifications,
};
