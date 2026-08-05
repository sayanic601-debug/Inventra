const userService = require("../services/userService");

// =====================================================
// GET ALL USERS
// =====================================================

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// UPDATE USER ROLE
// =====================================================

const updateUserRole = async (req, res) => {
  try {
    const updatedUser = await userService.updateUserRole(
      req.params.id,
      req.body.role
    );

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    const statusCode =
      error.message === "User not found" ? 404 : 400;

    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// DELETE USER
// =====================================================

const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    const statusCode =
      error.message === "User not found" ? 404 : 500;

    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser,
};