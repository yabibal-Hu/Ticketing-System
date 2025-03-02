// src/components/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-600 to-blue-600">
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Animate to this state
        transition={{ duration: 0.5 }} // Animation duration
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-white mb-8">
          Welcome to the Ticketing System
        </h1>
        <p className="text-xl text-gray-200 mb-12">
          Manage your support tickets efficiently and effectively.
        </p>
        <div className="space-x-20">
          <motion.div
            whileHover={{ scale: 1.05 }} // Scale up on hover
            whileTap={{ scale: 0.95 }} // Scale down on click
          >
            <Link
              to="/login"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
            >
              Login
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }} // Scale up on hover
            whileTap={{ scale: 0.95 }} // Scale down on click
          >
            <Link
              to="/signup"
              className="bg-purple-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-purple-600 transition-colors"
            >
              Signup
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
