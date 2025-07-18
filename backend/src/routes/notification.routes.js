import express from "express";
import {
  createNotification,
  getNotificationsByUser,
  deleteNotification,
  clearAllNotifications
} from "../controllers/notification.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, createNotification);
router.get("/", verifyJWT, getNotificationsByUser);
router.delete("/:id", verifyJWT, deleteNotification);
router.delete("/clear", verifyJWT, clearAllNotifications);

export default router;
