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

  //reads page and limit from req.query and clculate the skip use .skip(skip),limit(limit)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1;
  const skip = (page - 1) * limit;

  try {
 const items = await VaultItem.find({
  userId: req.user.id,
  isDeleted: false,
})
  .skip(skip)
  .limit(limit);

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

    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    item.isDeleted = true;
    item.deletedAt = new Date();

    await item.save();

    res.status(200).json({
      message: "Moved to Recycle Bin",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateVaultItem = async (req, res) => {
  try {
    const { title, type, content } = req.body;

    const item = await VaultItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Vault item not found",
      });
    }

    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    item.title = title;
    item.type = type;
    item.content = content;

    const updatedItem = await item.save();

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const togglePin = async (req, res) => {
  try {
    const item = await VaultItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Vault item not found",
      });
    }

    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    item.isPinned = !item.isPinned;

    const updatedItem = await item.save();

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getRecycleBinItems = async (req, res) => {
  try {
    const items = await VaultItem.find({
      userId: req.user.id,
      isDeleted: true,
    }).sort({ deletedAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const restoreVaultItem = async (req, res) => {
  try {
    const item = await VaultItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Vault item not found",
      });
    }

    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    item.isDeleted = false;
    item.deletedAt = null;

    await item.save();

    res.status(200).json({
      message: "File restored successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const permanentlyDeleteVaultItem = async (req, res) => {
  try {
    const item = await VaultItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Vault item not found",
      });
    }

    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      message: "File permanently deleted",
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
  updateVaultItem,
  togglePin,
  getRecycleBinItems,
  restoreVaultItem,
  permanentlyDeleteVaultItem,
};