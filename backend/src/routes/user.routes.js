import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateUserAvatar,
  updateUserCoverImage,
  updateAccountDetails,
  getUserById,
  updateUserRole,
  deleteUser,
  getAllUsersTeamRole,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

// Auth routes
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

// User management
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);

// File uploads
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), verifyJWT, updateUserAvatar);
router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), verifyJWT, updateUserCoverImage);

// Admin/User role management
router.route("/c/:username").get(isAdmin, getUserById);
router.route("/update-user-role").patch(isAdmin, updateUserRole);
router.route("/:id/delete-user").delete(verifyJWT, deleteUser);
router.route("/team-roles").get(isAdmin, getAllUsersTeamRole);

export default router;
