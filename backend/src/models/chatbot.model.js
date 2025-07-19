import mongoose, { Schema } from "mongoose";

const chatbotSchema = new Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Chatbot = mongoose.model("Chatbot", chatbotSchema);
