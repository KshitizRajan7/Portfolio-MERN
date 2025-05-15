import ownerModel from "../models/owner.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import { createOwner } from "../services/owner.service.js";
import { validationResult } from "express-validator";

export const registerOwner = async (req, res) => {
  const errors = validationResult(req); // Validate the request body using express-validator
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // If there are validation errors, return 400 Bad Request
  }
  try {
    const { fullName, email, password } = req.body; // Extract the required fields from the request body
    const isViewerAlreadyExists = await ownerModel.findOne({ email }); // Check if the viewer already exists in the database
    if (isViewerAlreadyExists) {
      return res.status(400).json({ message: "Owner already exists" }); // If viewer already exists, return 400 Bad Request
    }
    const hashPassword = await ownerModel.hashPassword(password); // Hash the password using the viewer model's method
    const owner = await createOwner({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashPassword,
    }); // Call the createViewer service to create a new viewer
    const token = owner.generateAuthToken(); // Generate a JWT token for the viewer
    console.log(token);
    res.status(201).json({token,owner}); // Return the created viewer with 201 Created status
  } catch (error) {
    res.status(500).json({ message:"error in register", error}); // If an error occurs, return 500 Internal Server Error
  }
};

export const loginOwner = async (req, res) => {
    const errors = validationResult(req); // Validate the request body using express-validator
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // If there are validation errors, return 400 Bad Request
    }
    try {
        const { email, password } = req.body; // Extract the required fields from the request body
        const owner = await ownerModel.findOne({ email }); // Find the owner by email
        if (!owner) {
        return res.status(401).json({ message: "Invalid email or password" }); // If owner not found, return 401 Unauthorized
        }
        const isMatch = await owner.comparePassword(password); // Compare the provided password with the stored password
        if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" }); // If passwords do not match, return 401 Unauthorized
        }
        const token = owner.generateAuthToken(); // Generate a JWT token for the owner
        res.cookie("token", token, { httpOnly: true }); // Set the token as a cookie in the response
        res.status(200).json({token,owner}); // Return the logged-in owner with 200 OK status
    } catch (error) {
        res.status(500).json({ message: error.message }); // If an error occurs, return 500 Internal Server Error
    }
    };

export const getOwnerProfile = async (req, res) => {
    try {
        const owner = req.owner; // Get the owner object from the request (set by authOwner middleware)
        res.status(200).json(owner); // Return the owner profile with 200 OK status
    } catch (error) {
        res.status(500).json({ message: error.message }); // If an error occurs, return 500 Internal Server Error
    }
}

export const logoutOwner = async (req, res) => {
    try {
        const token = req.cookies.token || req.header.authorization.split(' ')[1]; // Get the token from the request cookies
        await blacklistTokenModel.create({ token }); // Blacklist the token by saving it to the database
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" }); // If no token is provided, return 401 Unauthorized
        }
        res.clearCookie("token"); // Clear the token cookie from the response
        res.status(200).json({ message: "Logged out successfully" }); // Return success message with 200 OK status
    } catch (error) {
        res.status(500).json({ message: error.message }); // If an error occurs, return 500 Internal Server Error
    }
}

