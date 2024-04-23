const express = require("express");
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();

router.post(
  "/",
  authMiddleware([USER_ROLES.BUYER]),
  orderController.createOrder
);
router.get(
  "/",
  authMiddleware([USER_ROLES.ADMIN, USER_ROLES.BUYER, USER_ROLES.SELLER]),
  orderController.getOrders
);
router.get(
  "/count",
  authMiddleware([USER_ROLES.ADMIN]),
  orderController.getOrdersCount
);
router.get(
  "/:id",
  authMiddleware([USER_ROLES.ADMIN, USER_ROLES.BUYER, USER_ROLES.SELLER]),
  orderController.getOrderById
);
router.patch(
  "/:id",
  authMiddleware([USER_ROLES.SELLER]),
  orderController.updateOrder
);
router.delete(
  "/:id",
  authMiddleware([USER_ROLES.ADMIN, USER_ROLES.SELLER]),
  orderController.deleteOrder
);

module.exports = router;
