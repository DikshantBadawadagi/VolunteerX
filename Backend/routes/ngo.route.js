import express from "express";
import {
  registerNGO,
  loginNGO,
  logoutNGO,
  getNGOProfile,
  editNGOProfile
} from "../controllers/ngo.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(registerNGO);
router.route("/login").post(loginNGO);
router.route("/logout").get(logoutNGO);
router.route("/:id/profile").get(isAuthenticated, getNGOProfile);
router.route("/profile/edit").post(isAuthenticated, upload.single("profileImage"), editNGOProfile);

export default router;
