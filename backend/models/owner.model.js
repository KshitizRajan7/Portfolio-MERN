import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation

const ownerSchema = new mongoose.Schema({
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
    // contact:{
    //     phone:{
    //         type: String,
    //     },
    //     github:{
    //         type: String,
    //     },
    //     linkedin:{
    //         type: String,
    //     }
    // },
    email:{ 
        type: String,
        required: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address",
        ],
    },
    password:{
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"],
    },
    // skills:{
    //     skillName:{
    //         type: String,
    //     },
    //     skillDescription:{
    //         type: String,
    //     },
    //     skillImage:{
    //         type: String,
    //     }
    // },
    // bio:{
    //     type: String,
    // },
    // title:{
    //     type: String,
    // },
    // education:{
    //     educationName:{
    //         type: String,
    //     },
    //     educationDescription:{
    //         type: String,
    //     },
    //     educationLink:{
    //         type: String,
    //     },
    //     educationImage:{
    //         type: String,
    //     },
    //     educationSkills:{
    //         type: [String],
    //     },
    //     educationStartDate:{
    //         type: Date,
    //     },
    //     educationEndDate:{
    //         type: Date,
    //     },
    //     educationCurrent:{
    //         type: Boolean,
    //     },
    //     educationLocation:{
    //         type: String,
    //     },
    //     educationInstitution:{
    //         type: String,
    //     },
    //     educationDegree:{
    //         type: String,
    //     },
    // },
    // experience:{
    //     experienceName:{
    //         type: String,
    //     },
    //     experienceDescription:{
    //         type: String,
    //     },
    //     experienceLink:{
    //         type: String,
    //     },
    //     experienceImage:{
    //         type: String,
    //     },
    //     experienceSkills:{
    //         type: [String],
    //     },
    //     experienceStartDate:{
    //         type: Date,
    //     },
    //     experienceEndDate:{
    //         type: Date,
    //     },
    //     experienceCurrent:{
    //         type: Boolean,
    //     },
    //     experienceLocation:{
    //         type: String,
    //     },
    //     experienceCompany:{
    //         type: String,
    //     },
    //     experiencePosition:{
    //         type: String,
    //     },
    //     experienceType:{
    //         type: String,
    //     },
    //     experienceStatus:{
    //         type: String,
    //         enum: ["active", "inactive"],
    //         default: "inactive",
    //     },
    //     experienceSalary:{
    //         type: Number,
    //     },
    //     experienceSalaryType:{
    //         type: String,
    //         enum: ["hourly", "monthly", "yearly"],
    //         default: "hourly",
    //     },
        
    // projects:{
    //     projectName:{
    //         type: String,
    //     },
    //     projectDescription:{
    //         type: String,
    //     },
    //     projectLink:{
    //         type: String,
    //     },
    //     projectImage:{
    //         type: String,
    //     },
    //     projectSkills:{
    //         type: [String],
    //     },
    // },
    socketId:{
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
      }
})

ownerSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });   // Generate a token using the user's ID and a secret key      
    return token; // Return the generated token
}

ownerSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password); // Compare the provided password with the hashed password in the database
    return isMatch; // Return true if they match, false otherwise
}   

ownerSchema.statics.hashPassword = async function (password) {  
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with the generated salt
    return hashedPassword; // Return the hashed password
}

const ownerModel = mongoose.model("Owner", ownerSchema); // Create a model based on the schema
export default ownerModel; // Export the model for use in other parts of the application