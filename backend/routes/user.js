import express from "express";
import authenticate from "../middlewares/auth.js";
import {
  deleteUserAcount,
  loginUser,
  profileUser,
  registerUser,
  updateUser,
  logoutUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user_profile/:id", authenticate, profileUser);
router.post("/update_user/:id", authenticate, updateUser);
router.post("/delete_user/:id", authenticate, deleteUserAcount);
router.post("/logout", logoutUser);

export default router;
