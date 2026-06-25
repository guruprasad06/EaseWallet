const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createVaultItem,
  getVaultItems,
} = require("../controllers/vaultController");

const router = express.Router();

router.post("/", protect, createVaultItem);

router.get("/", protect, getVaultItems);

module.exports = router;