import nodemailer from "nodemailer";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or use your own SMTP settings
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendNotificationToAllUsers = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;

  if (!subject || !message) {
    throw new ApiError(400, "Subject and message are required");
  }

  const users = await User.find({}, "email");

  if (!users.length) {
    throw new ApiError(404, "No users found to notify");
  }

  const emailList = users.map((user) => user.email);

const mailOptions = {
    from: `"Neighborhood Helper" <${process.env.SMTP_USER}>`,
    to: emailList,
    subject: subject,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          
          <div style="background-color: #1e90ff; padding: 20px; text-align: center;">
        <h1 style="color: white; margin-top: 10px;">Neighborhood Helper</h1>
      </div>

          <!-- Banner -->
          <div>
            <img src="https://img.freepik.com/free-vector/attention-concept-illustration_114360-7902.jpg" alt="Alert" style="width: 100%; height: auto;" />
          </div>

          <!-- English Message -->
          <div style="padding: 30px;">
            <h2 style="color: #333333;">📢 ${subject}</h2>
            <p style="color: #555555; font-size: 16px; line-height: 1.6;">
              ${message}
            </p>

            <hr style="margin: 20px 0;" />

            <!-- Hindi Translation -->
            <p style="color: #444444; font-size: 16px;">
              🔔 <strong>हिंदी में सूचना:</strong><br/>
              सर्वर आज अस्थायी रूप से डाउन रहेगा। कृपया कोई भी महत्वपूर्ण कार्य बाद में करें।
            </p>

            <div style="margin-top: 30px; text-align: center;">
              <a href="https://yourdomain.com" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Visit Neighborhood Helper
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f1f1f1; padding: 20px; text-align: center; color: #777777; font-size: 14px;">
            You're receiving this email because you're part of <strong>Neighborhood Helper</strong>.<br/>
            📅 ${new Date().toDateString()} • © ${new Date().getFullYear()} Neighborhood Helper.
          </div>
        </div>
      </div>
    `
  };


  // Send to all users
  await transporter.sendMail(mailOptions);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Notification sent to all users"));
});

export { sendNotificationToAllUsers };
