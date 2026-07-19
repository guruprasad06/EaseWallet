const User = require("../models/User");
const VaultItem = require("../models/VaultItem");



const getUsersWithDeletedFiles = async (req, res) => {
  try {
    const users = await VaultItem.aggregate([
      { $match: { isDeleted: true } },
      {
        $group: {
          _id: "$userId",
          deletedFiles: { $sum: 1 },
        },
      },
    ]);

    const result = await Promise.all(
      users.map(async (u) => {
        const user = await User.findById(u._id).select(
          "name email"
        );

        return {
          user,
          deletedFiles: u.deletedFiles,
        };
      })
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getDeletedFilesByUser = async (req, res) => {
  try {
    const files = await VaultItem.find({
      userId: req.params.userId,
      isDeleted: true,
    });

    res.json(files);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const adminRestoreFile = async (req, res) => {
  try {
    const file = await VaultItem.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    file.isDeleted = false;
    file.deletedAt = null;

    await file.save();

    res.json({
      message: "File restored successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const adminDeleteForever = async (req, res) => {
  try {
    const file = await VaultItem.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    await VaultItem.findByIdAndDelete(req.params.id);

    res.json({
      message: "File permanently deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const suspendedUsers = await User.countDocuments({
      isSuspended: true,
    });
    const totalFiles = await VaultItem.countDocuments();

    res.json({
      totalUsers,
      totalAdmins,
      suspendedUsers,
      totalFiles,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getUsersWithDeletedFiles,
  getDeletedFilesByUser,
  adminRestoreFile,
  adminDeleteForever,
};