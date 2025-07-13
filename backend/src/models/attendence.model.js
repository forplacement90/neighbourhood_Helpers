import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      trim: true
    },
    eventId: {
      type: String,
      required: true,
      ref: "Event"
    },
    userId: {
      type: String,
      required: true,
      ref: "User"
    },
    attendedAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false
  }
);

export const Attendance = mongoose.model("Attendance", attendanceSchema);
