const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const admin = require("../middleware/adminMiddleware");
const { getAllUsers, deleteUser, updateUserRole } = require("../controllers/userController");

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
router.patch("/:id/role", protect, admin, updateUserRole);

module.exports = router;