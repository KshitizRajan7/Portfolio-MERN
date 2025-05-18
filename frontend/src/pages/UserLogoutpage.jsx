import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem("token");
      console.log("Token before logout:", token);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/viewers/logout`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true, // Include if you're using cookies too
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
        // Optional: handle error, e.g. redirect anyway
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default UserLogout;
