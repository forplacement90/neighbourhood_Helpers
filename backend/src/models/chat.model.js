import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    duration: {
      type: Number,
      required: true,
    },
    startedAt: {
      type: Date,
      required: true,
    },
    endedAt: {
      type: Date,
      required: true,
    },
    workspaceId: {
      type: String,
      required: true,
      ref: "Workspace",
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

export const Chat = mongoose.model("Chat", chatSchema);
