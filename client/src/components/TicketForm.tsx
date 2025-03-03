// src/components/TicketForm.tsx
import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addTicket } from "../store/ticketSlice";
import { motion } from "framer-motion";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const TicketForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${SERVER_URL}/tickets`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("response", response.data);
      dispatch(addTicket(response.data.ticket));
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Failed to create ticket", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-100"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">
        Create New Ticket
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={4}
          required
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Create Ticket
        </motion.button>
      </form>
    </motion.div>
  );
};

export default TicketForm;
