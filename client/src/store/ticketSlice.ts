// src/store/ticketSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ticket } from "../types";

interface TicketState {
  tickets: Ticket[];
}

const initialState: TicketState = {
  tickets: [],
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      console.log("Setting tickets:", action.payload); // Debugging
      state.tickets = action.payload;
    },
    addTicket: (state, action: PayloadAction<Ticket>) => {
      console.log("Adding ticket:", action.payload); // Debugging
      state.tickets.push(action.payload);
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex(
        (t) => t._id === action.payload._id
      );
      if (index !== -1) {
        console.log("Updating ticket:", action.payload); // Debugging
        state.tickets[index] = action.payload;
      }
    },
  },
});

export const { setTickets, addTicket, updateTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
