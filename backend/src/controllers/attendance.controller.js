import { Attendance } from "../models/attendence.model.js";


// 1. Mark Attendance
export const markAttendance = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user._id; // Assuming verifyToken sets req.user

    const existing = await Attendance.findOne({ eventId, userId });
    if (existing) {
      return res.status(400).json({ message: "Attendance already marked." });
    }

    const attendance = await Attendance.create({
      eventId,
      userId,
      attendedAt: new Date()
    });

    res.status(201).json({ message: "Attendance marked successfully.", attendance });
  } catch (err) {
    res.status(500).json({ message: "Error marking attendance.", error: err.message });
  }
};

// 2. Cancel Attendance
export const cancelAttendance = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user._id;

    const deleted = await Attendance.findOneAndDelete({ eventId, userId });
    if (!deleted) {
      return res.status(404).json({ message: "No attendance record found to cancel." });
    }

    res.status(200).json({ message: "Attendance cancelled successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling attendance.", error: err.message });
  }
};

// 3. Get All Attendance
export const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("userId", "name email")
      .populate("eventId", "name startTime");
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance records.", error: err.message });
  }
};

// 4. Get Attendance by User
export const getUserAttendance = async (req, res) => {
  try {
    const { userId } = req.params;

    //  Strict check: only allow the actual user to access
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "Access denied. You can only view your own attendance." });
    }

    const records = await Attendance.find({ userId }).populate("eventId", "name startTime");

    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user attendance.", error: err.message });
  }
};


// 5. Get Attendance by Event
export const getEventAttendance = async (req, res) => {
  try {
    const { eventId } = req.params;
    const records = await Attendance.find({ eventId })
      .populate("userId", "name email");
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching event attendance.", error: err.message });
  }
};
