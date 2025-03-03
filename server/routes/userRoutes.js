const express = require("express");
const { getUsers, updateOnlineStatus, getUserById } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getUsers); // Get all registered users
router.get("/:userId", protect, getUserById); // Get all registered users
router.put("/status", protect, updateOnlineStatus); // Update online status

// export default router;
module.exports = router;
