import "dotenv/config";
import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 40,
  maxOutputTokens: 2048,
  responseMimeType: "text/plain",
};

const history = [];

async function runGemini(prompt) {
  const chat = model.startChat({
    generationConfig,
    history,
  });

  const result = await chat.sendMessage(prompt);
  const responseText = result.response.text();

  history.push({ role: "user", parts: [{ text: prompt }] });
  history.push({ role: "model", parts: [{ text: responseText }] });

  return responseText;
}

export default runGemini;
