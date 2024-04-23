import { Router } from "express";
import controller from "../controllers";

// import middleware from "../middleware";

import middleware from "../middleware";

const router = Router();

// Root API Call
router.get("/", (req, res, next) => {
	res.send("Auth API");
	next();
});

// Buyer Endpoints
router.post("/buyer/register", controller.registerBuyer);
router.post("/buyer/login", controller.loginBuyer);
router.get("/buyer/:id", controller.getBuyerDetails);
router.get("/buyer/", controller.getAllBuyers);
router.put("/buyer-edit/:id", controller.editBuyerDetails);
router.delete("/buyer-delete/:id", controller.deleteBuyer);

// Admin Endpoints
router.get("/admin", middleware.admin_auth, controller.checkAdmin); // Check if the user is an admin
router.get("/user", middleware.user_auth, controller.isLoggedIn); // Check if the user is logged in
// router.get("/buyer", middleware.buyer_auth, controller.checkBuyer); // Check if the user is an buyer
// router.get("/seller", middleware.seller_auth, controller.checkSeller); // Check if the user is an seller
// TODO: Middlewares Not Added Yet
router.get("/admin/:id", controller.getAdminDetails);
router.post("/admin/login", controller.loginAdmin);
router.post("/admin/register", controller.registerAdmin);
router.put("/admin-edit/:id", controller.editAdminDetails);
router.delete("/admin-delete/:id", controller.deleteAdmin);


// Seller Endpoints
router.post("/seller/register", controller.registerSeller);
router.post("/seller/login", controller.loginSeller);
router.get("/seller/:id", controller.getSellerDetails);
router.get("/seller/", controller.getAllSellers);
router.put("/seller-edit/:id", controller.editSellerDetails);
router.delete("/seller-delete/:id", controller.deleteSeller);

export default router;
