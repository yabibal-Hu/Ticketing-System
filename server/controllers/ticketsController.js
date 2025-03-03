const Ticket = require("../models/Ticket");
// const User = require("../models/User");

const getAllTickets = async (req, res) => {
 try {
  // collect tickets with user details
  const tickets = await Ticket.find( {} ).populate("createdBy");
  
  res.json({ tickets });
 } catch (error) {
  res.status(500).json({ message: "Server error" });
 }
};

const postTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const ticket = new Ticket({ title, description, createdBy: req.user._id });
    await ticket.save();

    // Populate the createdBy field with user details
    const populatedTicket = await Ticket.findById(ticket._id).populate(
      "createdBy",
      "username _id role" // Include only necessary fields
    );

    res
      .status(201)
      .json({ message: "Ticket created", ticket: populatedTicket });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const putTicketById = async (req, res) => {
 try {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const ticket = await Ticket.findById(id);
  if (!ticket) {
   return res.status(404).json({ message: "Ticket not found" });
  }
  ticket.title = title;
  ticket.description = description;
  ticket.status = status;
  await ticket.save();
  res.json({ message: "Ticket updated" });
 } catch (error) {
  res.status(500).json({ message: "Server error" });
 }
};


module.exports = { getAllTickets, postTicket, putTicketById };