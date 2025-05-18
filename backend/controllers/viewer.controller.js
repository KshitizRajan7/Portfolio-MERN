import viewerModel from "../models/viewer.model.js";
import { createViewer } from "../services/viewer.service.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const registerViewer = async (req, res) => {
  const errors = validationResult(req); // Validate the request body using express-validator
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // If there are validation errors, return 400 Bad Request
  }
  try {
    const { fullName, email, password } = req.body; // Extract the required fields from the request body
    const isViewerAlreadyExists = await viewerModel.findOne({ email }); // Check if the viewer already exists in the database
    if (isViewerAlreadyExists) {
      return res.status(400).json({ message: "Viewer already exists" }); // If viewer already exists, return 400 Bad Request
    }
    const hashPassword = await viewerModel.hashPassword(password); // Hash the password using the viewer model's method
    const viewer = await createViewer({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashPassword,
    }); // Call the createViewer service to create a new viewer
    const token = viewer.generateAuthToken(); // Generate a JWT token for the viewer
    res.status(201).json({token,viewer}); // Return the created viewer with 201 Created status
  } catch (error) {
    res.status(500).json({ message: error.message }); // If an error occurs, return 500 Internal Server Error
  }
};
export const loginViewer = async (req, res) => {
  const errors = validationResult(req); // Validate the request body using express-validator
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // If there are validation errors, return 400 Bad Request
  }
  try {
    const { email, password } = req.body; // Extract the required fields from the request body
    const viewer = await viewerModel.findOne({ email }); // Find the viewer by email
    if (!viewer) {
      return res.status(401).json({ message: "Invalid email or password" }); // If viewer not found, return 401 Unauthorized
    }
    const isMatch = await viewer.comparePassword(password); // Compare the provided password with the stored password
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" }); // If passwords do not match, return 401 Unauthorized
    }
    const token = viewer.generateAuthToken(); // Generate a JWT token for the viewer
    res.cookie("token", token, { httpOnly: true }); // Set the token as a cookie in the response
    res.status(200).json({token,viewer}); // Return the logged-in viewer with 200 OK status
  } catch (error) {
    res.status(500).json({ message: error.message }); // If an error occurs, return 500 Internal Server Error
  }
};
export const getViewerProfile = async (req, res) => {
  try {
    const viewer = req.viewer; // Get the viewer object from the request (set by authViewer middleware)
    res.status(200).json(viewer); // Return the viewer profile with 200 OK status
  } catch (error) {
    res.status(500).json({ message: error.message }); // If an error occurs, return 500 Internal Server Error
  }
};
export const logoutViewer = async (req, res) => {
  try {
    const token = req.cookies.token || req.header.authorization.split(" ")[1]; // Get the token from the request cookies
    await blacklistTokenModel.create({ token }); // Blacklist the token by saving it to the database
    if (!token) {
      return res.status(401).json({ message: "Token is not provided" }); // If no token is provided, return 401 Unauthorized
    }
    
  res.clearCookie("token"); // Clear the token cookie from the response
    res.status(200).json({ message: "Logged out successfully" }); // Return success message with 200 OK status
  } catch (error) {
    res.status(500).json({ message: error.message }); // If an error occurs, return 500 Internal Server Error
  }
};
