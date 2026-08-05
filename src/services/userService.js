const User = require("../models/User");

// =====================================================
// GET ALL USERS
// =====================================================

const getAllUsers = async () => {
  const users = await User.find().select("-password");

  return users;
};

// =====================================================
// UPDATE USER ROLE
// =====================================================

const updateUserRole = async (id, role) => {
  const allowedRoles = ["admin", "manager", "staff"];

  if (!allowedRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  user.role = role;

  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

// =====================================================
// DELETE USER
// =====================================================

const deleteUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  await User.findByIdAndDelete(id);

  return {
    message: "User deleted successfully",
  };
};

module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser,
};