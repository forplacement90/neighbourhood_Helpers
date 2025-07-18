import { Event } from "../models/event.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

// Create Event and send email to all users
export const createEvent = asyncHandler(async (req, res) => {
  const { name, description, location, startTime, endTime } = req.body;
  const createdBy = req.user._id;

  if (!name || !startTime || !endTime) {
    throw new ApiError(400, "Event name, startTime and endTime are required");
  }

  const event = await Event.create({
    name,
    description,
    location,
    startTime,
    endTime,
    createdBy
  });

  // Fetch all user emails
  const users = await User.find({}, "email fullName");
  const recipients = users.map(user => user.email);

  // Send notification email
  await sendEmail({
  to: recipients,
  subject: `📢 New Event: ${event.name}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 10px;">
      <h2 style="color: #2c3e50;">📅 ${event.name}</h2>
      <p style="color: #34495e; font-size: 16px;">
        ${event.description || "No description provided."}
      </p>
      <hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">
      <p style="font-size: 15px; color: #2f3542;"><strong>📍 Location:</strong> ${event.location || "To be decided"}</p>
      <p style="font-size: 15px; color: #2f3542;"><strong>🕒 Time:</strong> ${new Date(event.startTime).toLocaleString()} - ${new Date(event.endTime).toLocaleString()}</p>
      <div style="margin-top: 30px;">
        <a href="#" style="padding: 10px 20px; background-color: #1e90ff; color: #fff; text-decoration: none; border-radius: 5px;">View Event</a>
      </div>
      <p style="margin-top: 30px; font-size: 12px; color: #6c757d;">You received this email because you are part of our community team. Please do not reply directly to this message.</p>
    </div>
  `
});


  res.status(201).json(new ApiResponse(201, event, "Event created and notifications sent"));
});

// Get All Events
export const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().populate("createdBy", "username email");
  res.status(200).json(new ApiResponse(200, events, "All events fetched"));
});

// Get Single Event
export const getEventById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id).populate("createdBy", "username email");

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  res.status(200).json(new ApiResponse(200, event, "Event details fetched"));
});

// Update Event
export const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (event.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this event");
  }

  Object.assign(event, req.body);
  await event.save();

  res.status(200).json(new ApiResponse(200, event, "Event updated successfully"));
});

// Delete Event
export const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (event.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this event");
  }

  await event.deleteOne();

  res.status(200).json(new ApiResponse(200, null, "Event deleted successfully"));
});
