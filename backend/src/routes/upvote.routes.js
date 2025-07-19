import express from "express";
import {
  createUpvote,
  deleteUpvote,
  getUpvotesByIssue,
  hasUserUpvoted,
} from "../controllers/upvote.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/", verifyJWT ,createUpvote);
router.delete("/",verifyJWT ,  deleteUpvote);
router.get("/issue/:issueId", isAdmin , getUpvotesByIssue);
router.get("/check/:issueId", verifyJWT,  hasUserUpvoted);

export default router;
