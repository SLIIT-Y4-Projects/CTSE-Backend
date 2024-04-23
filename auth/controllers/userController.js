const User = require("../models/User");

const userController = {
  // get all users
  getUsers: async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 });

      res.status(200).json({ success: true, users });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get user by id
  getUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId, { password: 0 });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // update user
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });

      updatedUser.password = undefined;

      res.status(200).json({
        success: true,
        user: updatedUser,
        message: "User updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // delete user
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const deletedUser = await User.findByIdAndDelete(userId);

      res.status(200).json({
        success: true,
        user: deletedUser,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get users count using aggregation
  getUsersCount: async (req, res) => {
    try {
      const usersCount = await User.aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

      res.status(200).json({ success: true, count: usersCount[0]?.count || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};

module.exports = userController;
