import mongoose, { Schema } from "mongoose";

const inviteSchema = new Schema(
  {
    inviteId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ["email", "link", "user"],
      trim: true
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Workspace"
    },
    inviterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false
  }
);

export const Invite = mongoose.model("Invite", inviteSchema);
