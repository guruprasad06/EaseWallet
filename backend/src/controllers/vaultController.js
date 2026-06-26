const VaultItem = require("../models/VaultItem");

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

const getVaultItems = async (req, res) => {
  try {
    const items = await VaultItem.find({
      userId: req.user.id,
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const Vault = require("../models/VaultItem");

const deleteVaultItem = async (req, res) => {
  try {
    const item = await VaultItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    await item.deleteOne();

    res.json({
      message: "Item deleted successfully",
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