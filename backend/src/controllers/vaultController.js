const VaultItem = require("../models/VaultItem");

// Create Vault Item
const createVaultItem = async (req, res) => {
  try {
    const { title, type, content } = req.body;

    const item = await VaultItem.create({
      userId: req.user.id,
      title,
      type,
      content,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Vault Items
const getVaultItems = async (req, res) => {
  try {
    const items = await VaultItem.find({
      userId: req.user.id,
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Vault Item
const deleteVaultItem = async (req, res) => {
  try {
    const item = await VaultItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Vault item not found",
      });
    }

    // Security check - only owner can delete
    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      message: "Vault item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createVaultItem,
  getVaultItems,
  deleteVaultItem,
};