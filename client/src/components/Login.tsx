// src/components/Login.tsx
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import { User } from "../types";
import { motion } from "framer-motion"; // Import Framer Motion

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}/auth/login`, {
        username,
        password,
      });

      const { token } = response.data;

      // Store the token in session storage
      sessionStorage.setItem("token", token);

      // Decode the token to get user information
      const decodedToken: { _id: string; username: string; role: string } =
        jwtDecode(token);
      const user: User = {
        id: decodedToken._id,
        username: decodedToken.username,
        role: decodedToken.role,
      };

      // Dispatch the user data to Redux
      dispatch(setCredentials({ user, token }));

      // Navigate based on user role
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-600 to-blue-600">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} // Initial animation state
        animate={{ opacity: 1, scale: 1 }} // Animate to this state
        transition={{ duration: 0.5 }} // Animation duration
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {setUsername(e.target.value); setError("")}}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {setPassword(e.target.value); setError("")}}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }} // Scale up on hover
            whileTap={{ scale: 0.95 }} // Scale down on click
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Login
          </motion.button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
