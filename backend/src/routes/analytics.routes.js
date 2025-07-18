import express from "express";
import {
  createAnalytics,
  incrementUpvote,
  incrementComment,
  getAnalytics
} from "../controllers/analytics.controller.js";

const router = express.Router();

// Init analytics for a new issue
router.post("/init/:issueId", createAnalytics);

// Increment upvote count
router.patch("/upvote/:issueId", incrementUpvote);

// Increment comment count
router.patch("/comment/:issueId", incrementComment);

// Get analytics for an issue
router.get("/:issueId", getAnalytics);

export default router;
