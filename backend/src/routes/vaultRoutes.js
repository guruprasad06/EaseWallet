const express = require("express");
const upload =require("../middleware/uploadMiddleware");
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
const VaultItem = require("../models/VaultItem");

router.post(
  "/upload",
  protect,
  upload.single("file"),
  async (req, res) => {
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    if (!req.file) {
      return res.status(400).json({
        message: "No file received",
      });
    }

    try {
      const item = await VaultItem.create({
        userId: req.user.id,
        title: req.file.originalname,
        type: "document",
        content: req.file.path,
      });

      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;