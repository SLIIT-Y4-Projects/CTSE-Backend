import { insertBuyer, authenticateBuyer, getBuyerDetails, getAllBuyers, editBuyerDetails, deleteBuyer } from "./Buyer.service";

import { getAdminDetails, authenticateAdmin, insertAdmin, editAdminDetails, deleteAdmin } from "./Admin.service";

import {insertSeller, authenticateSeller, getSellerDetails, getAllSellers, editSellerDetails, deleteSeller} from "./Seller.service";

export default {
	// Buyer Auth services
	insertBuyer,
	authenticateBuyer,
	getBuyerDetails,
	getAllBuyers,
	editBuyerDetails,
	deleteBuyer,
	

	// Admin Auth services
	getAdminDetails,
	authenticateAdmin,
	insertAdmin,
	editAdminDetails,
	deleteAdmin,

	// Seller Auth services
	insertSeller,
	authenticateSeller,
	getSellerDetails,
	getAllSellers,
	editSellerDetails,
	deleteSeller,
};
