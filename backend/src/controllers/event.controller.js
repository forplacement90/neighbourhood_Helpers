import { Event } from "../models/event.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

//  Create Event and send email to all users
export const createEvent = asyncHandler(async (req, res) => {
  const { name, description, location, startTime, endTime } = req.body;
  const createdBy = req.admin?._id;

  if (!name || !startTime || !endTime) {
    throw new ApiError(400, "Event name, startTime and endTime are required");
  }

  const event = await Event.create({
    name,
    description,
    location,
    startTime,
    endTime,
    createdBy,
  });

  // Fetch all user emails
  const users = await User.find({}, "email fullName");
  const recipients = users.map((user) => user.email);

  // Send notification email
  await sendEmail({
    to: recipients,
    subject: `📢 New Event: ${event.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 0; background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #1e90ff; padding: 20px; text-align: center;">
          <h1 style="color: white; margin-top: 10px;">Neighborhood Helper</h1>
        </div>
        <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?fit=crop&w=600&q=80" alt="Event" style="width: 100%; height: auto;">
        <div style="padding: 20px;">
          <h2 style="color: #2c3e50;">📅 ${event.name}</h2>
          <p style="color: #34495e; font-size: 16px;">
            ${event.description || "No description provided."}
          </p>
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">
          <p style="font-size: 15px; color: #2f3542;"><strong>📍 Location:</strong> ${event.location || "To be decided"}</p>
          <p style="font-size: 15px; color: #2f3542;"><strong>🕒 Time:</strong> ${new Date(event.startTime).toLocaleString()} - ${new Date(event.endTime).toLocaleString()}</p>
          <div style="margin-top: 30px; text-align: center;">
            <a href="#" style="padding: 12px 25px; background-color: #1e90ff; color: #fff; text-decoration: none; font-weight: bold; border-radius: 5px;">View Event</a>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #6c757d;">You received this email because you're part of the Neighborhood Helper community. Please do not reply directly to this message.</p>
        </div>
      </div>
    `,
  });

  res.status(201).json(new ApiResponse(201, event, "Event created and notifications sent"));
});

//  Get All Events
export const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().populate("createdBy", "fullName email");
  res.status(200).json(new ApiResponse(200, events, "All events fetched"));
});

//  Get Single Event
export const getEventById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id).populate("createdBy", "fullName email");

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  res.status(200).json(new ApiResponse(200, event, "Event details fetched"));
});

//  Update Event
export const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (event.createdBy.toString() !== req.admin?._id.toString()) {
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

  if (event.createdBy.toString() !== req.admin?._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this event");
  }

  await event.deleteOne();

  res.status(200).json(new ApiResponse(200, null, "Event deleted successfully"));
});
