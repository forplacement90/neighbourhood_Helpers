import express from "express";
import {
  createComment,
  getCommentsByIssue,
  updateComment,
  deleteComment
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, createComment);
router.get("/:issueId", getCommentsByIssue);
router.put("/:id", verifyJWT, updateComment);
router.delete("/:id", verifyJWT, deleteComment);

export default router;
