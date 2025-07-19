import express from "express";
import { sendNotificationToAllUsers } from "../controllers/email.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

// Only admin should access this ideally
router.post("/notify", isAdmin, sendNotificationToAllUsers);

export default router;
