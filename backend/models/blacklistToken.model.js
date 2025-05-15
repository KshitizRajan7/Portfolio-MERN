import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true,
        unique: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24, // 1 day in seconds
    },  
})

const blacklistTokenModel = mongoose.model("BlacklistToken", blacklistTokenSchema); // Create a model based on the schema
export default blacklistTokenModel; // Export the model for use in other parts of the application