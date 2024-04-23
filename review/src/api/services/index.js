import {
	insertProductReview,
	getAllProductReviews,
	getOneProductReview,
	
	
} from "./Product.Review.service";

import {
	insertSellerReview,
	getAllSellerReviews,
	getOneSellerReview,
	deleteSellerReview,
	
} from "./Seller.Review.service";

export default {
	//Product Review services
	insertProductReview,
	getAllProductReviews,
	getOneProductReview,
	

	//Seller Review services

	insertSellerReview,
	getAllSellerReviews,
	getOneSellerReview,
	deleteSellerReview,
};
