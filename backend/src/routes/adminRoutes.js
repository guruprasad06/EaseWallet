const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
  getUsersWithDeletedFiles,
  getDeletedFilesByUser,
  adminRestoreFile,
  adminDeleteForever,
} = require("../controllers/adminController");

router.get("/dashboard", protect, admin, getDashboardStats);

router.get(
  "/recovery/users",
  protect,
  admin,
  getUsersWithDeletedFiles
);

router.get(
  "/recovery/:userId",
  protect,
  admin,
  getDeletedFilesByUser
);

router.put(
  "/recovery/restore/:id",
  protect,
  admin,
  adminRestoreFile
);

router.delete(
  "/recovery/delete/:id",
  protect,
  admin,
  adminDeleteForever
);

module.exports = router;