import mongoose, { Schema } from "mongoose";

const workspaceSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      trim: true
    },
    folderId: {
      type: String,
      required: true,
      ref: "Folder"
    },
    teamId: {
      type: String,
      required: true,
      ref: "Team"
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false
  }
);

export const Workspace = mongoose.model("Workspace", workspaceSchema);
