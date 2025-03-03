// SERVER-SIDE: Optimized Express + Socket.io Server
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;

// Load environment variables
dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
// app.use index.js
app.use(require("./routes/index"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tickets", require("./routes/ticketsRoutes"));
// app.use("/api/messages", require("./routes/messageRoutes"));
// app.use("/api/conversations", require("./routes/conversationRoutes"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
