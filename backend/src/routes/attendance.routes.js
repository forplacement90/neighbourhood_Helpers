import express from "express";
import {
  markAttendance,
  cancelAttendance,
  getAllAttendance,
  getUserAttendance,
  getEventAttendance
} from "../controllers/attendance.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

//  Mark attendance (only logged-in users)
router.post("/mark", verifyJWT, markAttendance);

//  Cancel attendance (only logged-in users)
router.delete("/cancel", verifyJWT, cancelAttendance);

//  Get all attendance records (admin only - optional check)
router.get("/", verifyJWT, getAllAttendance);

//  Get attendance by userId
router.get("/user/:userId", verifyJWT, getUserAttendance);

//  Get attendance by eventId
router.get("/event/:eventId", verifyJWT, getEventAttendance);

export default router;
