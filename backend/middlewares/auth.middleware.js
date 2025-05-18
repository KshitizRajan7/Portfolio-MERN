import viewerModel from "../models/viewer.model.js";
import ownerModel from "../models/owner.model.js";
import jwt from "jsonwebtoken"; 
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const authViewer = async (req, res, next) => {
    const token = req.cookies.token ||(req.header.authorization && req.headers["authorization"]?.split(" ")[1]); // Extract the token from the Authorization header
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" }); // If no token is provided, return 401 Unauthorized
    }
    const isblacklisted = await blacklistTokenModel.findOne({ token }); // Check if the token is blacklisted
    if (isblacklisted) {
        return res.status(401).json({ message: "Unauthorized :no token" }); // If the token is blacklisted, return 401 Unauthorized
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
        const viewer = await viewerModel.findById(decoded._id).select("-password"); // Find the viewer by ID and exclude the password field
        if(!viewer) {
            return res.status(401).json({ message: "Viewer not found" }); // If the viewer is not found, return 401 Unauthorized
        }

        req.viewer = viewer; // Attach the viewer object to the request for later use
        next(); // Call the next middleware or route handler
    }catch(err) {
        return res.status(401).json({ message: "Unauthorized" }); // If token verification fails, return 401 Unauthorized
    }
};

export const authOwner = async (req, res, next) => {
    const token = req.cookies.token ||(req.header.authorization && req.headers["authorization"]?.split(" ")[1]); // Extract the token from the Authorization header
    if (!token) {
        return res.status(401).json({ message: "middleware check Unauthorized" }); // If no token is provided, return 401 Unauthorized
    }
    const isblacklisted = await blacklistTokenModel.findOne({ token }); // Check if the token is blacklisted
    if (isblacklisted) {
        return res.status(401).json({ message: "Unauthorized :no token" }); // If the token is blacklisted, return 401 Unauthorized
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
        const owner = await ownerModel.findById(decoded._id).select("-password"); // Find the owner by ID and exclude the password field
        if(!owner) {
            return res.status(401).json({ message: "Owner not found." }); // If the owner is not found, return 401 Unauthorized
        }

        req.owner = owner; // Attach the owner object to the request for later use
        next(); // Call the next middleware or route handler
    }catch(err) {
        return res.status(401).json({ message: "Unauthorized" }); // If token verification fails, return 401 Unauthorized
    }
};