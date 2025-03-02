const express = require("express");
const router = express.Router();
const {getAllTickets, postTicket,putTicketById} = require("../controllers/ticketsController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getAllTickets);
router.post("/", protect, postTicket);
router.put("/:id",protect, putTicketById);
module.exports = router;