import express from "express";
import {  verifyEmailOTP } from "../controllers/otp.controller.js";

const router = express.Router();

router.post("/verify-otp", verifyEmailOTP);

export default router;
