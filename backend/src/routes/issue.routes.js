import express from "express";
import {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} from "../controllers/issue.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, upload.single("image"), createIssue);
router.get("/", getAllIssues);
router.get("/:id", getIssueById);
router.put("/:id", verifyJWT, updateIssue);
router.delete("/:id", verifyJWT, deleteIssue);

export default router;
