import mongoose, { Schema } from "mongoose";

const workspaceSchema = new Schema(
  {
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Folder"
    },
    teamId: {
     type: mongoose.Schema.Types.ObjectId,
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
