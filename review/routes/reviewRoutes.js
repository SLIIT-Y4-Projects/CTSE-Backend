const express = require("express");
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();

router.post(
  "/",
  authMiddleware([USER_ROLES.BUYER]),
  reviewController.createReview
);
router.get(
  "/",
  authMiddleware([USER_ROLES.ADMIN, USER_ROLES.BUYER, USER_ROLES.SELLER]),
  reviewController.getReviews
);
router.get(
  "/count",
  authMiddleware([USER_ROLES.ADMIN]),
  reviewController.getReviewsCount
);
router.get(
  "/:id",
  authMiddleware([USER_ROLES.ADMIN, USER_ROLES.BUYER, USER_ROLES.SELLER]),
  reviewController.getReviewById
);
router.patch(
  "/:id",
  authMiddleware([USER_ROLES.BUYER, USER_ROLES.ADMIN]),
  reviewController.updateReview
);
router.delete(
  "/:id",
  authMiddleware([USER_ROLES.BUYER, USER_ROLES.ADMIN]),
  reviewController.deleteReview
);

module.exports = router;
