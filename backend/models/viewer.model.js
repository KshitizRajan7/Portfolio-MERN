import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation

export const viewerSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastName: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  socketId:{
    type: String,
  }
});

viewerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });   // Generate a token using the user's ID and a secret key  
  return token; // Return the generated token
}

viewerSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password); // Compare the provided password with the hashed password in the database
  return isMatch; // Return true if they match, false otherwise
}

viewerSchema.statics.hashPassword = async function (password) {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with the generated salt
  return hashedPassword; // Return the hashed password
}

const viewerModel = mongoose.model("Viewer", viewerSchema); // Create a model based on the schema
export default viewerModel; // Export the model for use in other parts of the application