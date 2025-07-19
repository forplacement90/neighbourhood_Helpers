import { Router } from "express";
import { askNeighborhoodBot, getAllBotChats } from "../controllers/chatbot.controller.js";

const router = Router();

router.post("/ask", askNeighborhoodBot);
router.get("/all", getAllBotChats);

export default router;
