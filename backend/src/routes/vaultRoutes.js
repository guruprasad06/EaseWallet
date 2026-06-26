const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createVaultItem,
  getVaultItems,
  deleteVaultItem,
  updateVaultItem,
} = require("../controllers/vaultController");

const router = express.Router();

router.post("/", protect, createVaultItem);

router.get("/", protect, getVaultItems);

router.delete("/:id", protect, deleteVaultItem);

router.put("/:id", protect, updateVaultItem);

module.exports = router;