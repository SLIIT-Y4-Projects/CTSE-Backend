const express = require("express");
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();

router.post(
  "/",
  authMiddleware([USER_ROLES.SELLER]),
  productController.createProduct
);
router.get(
  "/",
  authMiddleware([USER_ROLES.ADMIN, USER_ROLES.BUYER, USER_ROLES.SELLER]),
  productController.getProducts
);
router.get(
  "/count",
  authMiddleware([USER_ROLES.ADMIN, USER_ROLES.BUYER, USER_ROLES.SELLER]),
  productController.getProductsCount
);
router.get(
  "/:id",
  authMiddleware([USER_ROLES.ADMIN, USER_ROLES.BUYER, USER_ROLES.SELLER]),
  productController.getProductById
);
router.patch(
  "/:id",
  authMiddleware([USER_ROLES.SELLER]),
  productController.updateProduct
);
router.delete(
  "/:id",
  authMiddleware([USER_ROLES.ADMIN, USER_ROLES.SELLER]),
  productController.deleteProduct
);

module.exports = router;
