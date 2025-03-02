// src/components/TicketList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setTickets, updateTicket } from "../store/ticketSlice";
import { Ticket } from "../types";
import { motion } from "framer-motion";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const TicketList: React.FC<{ isAdmin?: boolean }> = ({ isAdmin = false }) => {
  const dispatch = useDispatch();
  const { tickets = [] } = useSelector((state: RootState) => state.tickets);
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/tickets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setTickets(response.data.tickets));
        setError(null);
      } catch (error) {
        console.error("Failed to fetch tickets", error);
        setError("Failed to fetch tickets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [token, dispatch]);

  const handleUpdateStatus = async (ticket: Ticket, status: string) => {
    if (status === "Open" || status === "In Progress" || status === "Closed") {
      try {
        await axios.put(
          `${SERVER_URL}/tickets/${ticket._id}`,
          { title: ticket.title, description: ticket.description, status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(updateTicket({ ...ticket, status }));
      } catch (error) {
        console.error("Failed to update ticket status", error);
      }
    } else {
      console.error("Invalid status value");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading tickets...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const filteredTickets = isAdmin
    ? tickets
    : tickets.filter((ticket) => ticket?.createdBy.username === user?.username);

  return (
    <div className="space-y-6">
      {filteredTickets.map((ticket, index) => (
        <motion.div
          key={ticket._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
        >
          <div className="flex flex-col space-y-4">
            {/* Ticket Title and Description */}
            <div>
              <h3 className="text-xl font-bold text-purple-600">
                <span className="text-gray-600">Title:</span> {ticket.title}
              </h3>
              <p className="text-gray-700 mt-2">{ticket.description}</p>
            </div>

            {/* Ticket Metadata */}
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      ticket.status === "Open"
                        ? "bg-green-100 text-green-600"
                        : ticket.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Created by:</span>{" "}
                  {ticket.createdBy.username}
                </p>
              </div>

              {/* Admin Dropdown */}
              {isAdmin && (
                <select
                  value={ticket.status}
                  onChange={(e) => handleUpdateStatus(ticket, e.target.value)}
                  className="mt-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TicketList;
