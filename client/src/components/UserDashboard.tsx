// src/components/UserDashboard.tsx
import React from "react";
import Navbar from "./Navbar";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";

const UserDashboard: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Create New Ticket</h2>
            <TicketForm />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Your Tickets</h2>
            <TicketList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
