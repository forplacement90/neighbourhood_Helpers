import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false
  }
);

export const Team = mongoose.model("Team", teamSchema);
