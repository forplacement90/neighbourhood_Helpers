import { OTP } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";




export const verifyEmailOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new ApiError(400, "Email and OTP are required");
  }

  //  Validate OTP
  const matchedOtp = await OTP.findOne({ email, otp });
  if (!matchedOtp) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  //  Check if user is registered
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User not registered. Please register first.");
  }

  // Set isVerified true
  user.isVerified = true;
  await user.save();

  // Delete OTP
  await OTP.deleteMany({ email });

  return res.status(200).json(
    new ApiResponse(200, { email, isVerified: true }, "Email verified successfully")
  );
});
