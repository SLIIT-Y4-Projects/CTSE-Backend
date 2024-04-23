const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/buyer/signup", authController.buyerSignup);
router.post("/seller/signup", authController.sellerSignup);
router.post("/login", authController.login);

module.exports = router;
