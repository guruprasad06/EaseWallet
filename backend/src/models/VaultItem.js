const mongoose = require("mongoose");

const vaultItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["note", "image", "document"],
      required: true,
    },

    content: {
      type: String,
    },
    isPinned: {
  type: Boolean,
  default: false,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "VaultItem",
  vaultItemSchema
);