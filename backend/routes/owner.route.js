import express from "express";

import { body } from "express-validator";
import { getOwnerProfile,logoutOwner, registerOwner, loginOwner } from "../controllers/owner.controller.js";
import { authOwner } from "../middlewares/auth.middleware.js"; // Import the authOwner middleware
const router = express.Router();

router.post(
  "/register",
  [
    body("fullName.firstName").isLength({min:3}).withMessage("First name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerOwner
); // Route for registering a new owner

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginOwner
); // Route for logging in a owner

router.get(
  "/profile",
  authOwner,
  getOwnerProfile
); // Route for getting the owner's profile, protected by authOwner middleware

router.get(
  "/logout",
  authOwner,
  logoutOwner
); // Route for logging out a owner, protected by authOwner middleware      

export default router; // Export the router for use in other parts of the application