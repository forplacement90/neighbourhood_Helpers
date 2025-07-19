import express from "express";
import {
  sendSOSAlert,
  getAllSOSAlerts,
  resolveSOSAlert,
} from "../controllers/sosAlert.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/send", verifyJWT, sendSOSAlert);
router.get("/all", verifyJWT, isAdmin, getAllSOSAlerts);
router.patch("/resolve/:alertId", verifyJWT, isAdmin, resolveSOSAlert);

export default router;
