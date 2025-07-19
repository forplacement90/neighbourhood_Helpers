import runGemini from "../utils/gemini.js";
import { Chatbot } from "../models/chatbot.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const askNeighborhoodBot = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    throw new ApiError(400, "Prompt is required");
  }

  const responseText = await runGemini(prompt);

  const savedChat = await Chatbot.create({ prompt, response: responseText });

  res.status(200).json(
    new ApiResponse(200, savedChat, "Response from Neighborhood-Helper")
  );
});

export const getAllBotChats = asyncHandler(async (req, res) => {
  const chats = await Chatbot.find().sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, chats, "All chatbot conversations"));
});
