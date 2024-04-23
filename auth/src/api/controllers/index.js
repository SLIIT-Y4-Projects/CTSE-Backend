import { registerBuyer, loginBuyer, getBuyerDetails, getAllBuyers, editBuyerDetails, deleteBuyer } from "./Buyer.controller";

import {
	getAdminDetails,
	loginAdmin,
	registerAdmin,
	editAdminDetails,
	deleteAdmin,
	checkAdmin,
	isLoggedIn,
} from "./Admin.controller";

import {registerSeller, loginSeller, getSellerDetails, getAllSellers, editSellerDetails, deleteSeller} from "./Seller.controller"

export default {
	// Buyer Auth Controllers
	registerBuyer,
	loginBuyer,
	getBuyerDetails,
	getAllBuyers,
	editBuyerDetails,
	deleteBuyer,

	// Admin Auth Controllers
	getAdminDetails,
	loginAdmin,
	registerAdmin,
	editAdminDetails,
	deleteAdmin,
	checkAdmin,
	isLoggedIn,

	// Seller Auth Controllers
	registerSeller,
	loginSeller,
	getSellerDetails,
	getAllSellers,
	editSellerDetails,
	deleteSeller,
};
