import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/event.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/", isAdmin, createEvent);
router.get("/", isAdmin, getAllEvents);
router.get("/:id",isAdmin, getEventById);
router.put("/:id", isAdmin, updateEvent);
router.delete("/:id", isAdmin, deleteEvent);

export default router;
