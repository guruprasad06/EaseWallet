const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const admin = require("../middleware/adminMiddleware");
const { getAllUsers, deleteUser } = require("../controllers/userController");

router.get(
  "/profile",
  protect,
  (req, res) => {
    res.json({
      message: "Protected Route Accessed",
      user: req.user,
    });
  }
);
router.get("/all", protect, admin, getAllUsers);

router.delete("/:id", protect, admin, deleteUser);

module.exports = router;