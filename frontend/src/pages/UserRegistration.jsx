import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from 'axios';

export default function UserRegistration() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });
    const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const {user,setUser} = useContext(UserDataContext);
  console.log("user in registration",user);


  // Simple validation
  // const validate = () => {
  //   const newErrors = {};
  //   if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
  //   if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
  //   if (!formData.email.trim()) newErrors.email = "Email is required";
  //   else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
  //   if (!formData.password) newErrors.password = "Password is required";
  //   else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
  //   if (formData.confirmPassword !== formData.password)
  //     newErrors.confirmPassword = "Passwords do not match";
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleChange = (e) => {
  //   setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // if (validate()) {
    //   // Proceed with registration logic (e.g., API call)
    //   alert("User registered successfully!");
    //   // Reset form (optional)
    //   setFormData({
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //   });
      // setErrors({});
      
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/viewers/register`,newUser);
    if(response.status === 201){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token);
      navigate('/');
    }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Create Your Account
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block mb-1 font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              placeholder="John"
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block mb-1 font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              placeholder="Doe"
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter password"
                className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          {/* <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div> */}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition duration-200"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <Link to="/login" className="text-indigo-600 font-medium ml-1 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
