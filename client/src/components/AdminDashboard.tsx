// src/components/AdminDashboard.tsx
import React from "react";
import Navbar from "./Navbar";
import TicketList from "./TicketList";

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <h2 className="text-xl font-bold mb-4">All Tickets</h2>
        <TicketList isAdmin />
      </div>
    </div>
  );
};

export default AdminDashboard;
