const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();

router.get("/", authMiddleware([USER_ROLES.ADMIN]), userController.getUsers);
router.get(
  "/count",
  authMiddleware([USER_ROLES.ADMIN]),
  userController.getUsersCount
);
router.get(
  "/:id",
  authMiddleware([USER_ROLES.ADMIN, USER_ROLES.BUYER, USER_ROLES.SELLER]),
  userController.getUserById
);
router.patch(
  "/:id",
  authMiddleware([USER_ROLES.ADMIN, USER_ROLES.BUYER, USER_ROLES.SELLER]),
  userController.updateUser
);
router.delete(
  "/:id",
  authMiddleware([USER_ROLES.ADMIN, USER_ROLES.BUYER, USER_ROLES.SELLER]),
  userController.deleteUser
);

module.exports = router;
