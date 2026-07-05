const User = require("../models/User");
const VaultItem = require("../models/VaultItem");

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
};