const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    profileImage: {
  type: String,
  default: "",
},
    

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    
  isSuspended:{
  type: Boolean,
  default: false,
},
status: {
  type: String,
  enum: ["active", "suspended"],
  default: "active",
},

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);