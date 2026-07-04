const express = require("express");
const protect = require("../middleware/authMiddleware");
const { getAllUsers } = require("../controllers/userController");
const router = express.Router();
const admin=require("../middleware/adminMiddleware");

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


module.exports = router;