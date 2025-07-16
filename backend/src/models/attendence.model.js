import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Event"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
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
