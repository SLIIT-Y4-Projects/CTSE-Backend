import SellerReviewModel from "../models/Seller.Review.model";

// Insert one Seller Review
export const insertSellerReview = async (SellerReviewData) => {
	return await SellerReviewModel.create(SellerReviewData)
		.then(async (sellerReviews) => {
			await sellerReviews.save();
			return sellerReviews;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Get all Seller Reviews
export const getAllSellerReviews = async () => {
	return await SellerReviewModel.find({})
		.then((sellerReviews) => {
			return sellerReviews;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Get one Seller Review
export const getOneSellerReview = async (SellerReviewId) => {
	return await SellerReviewModel.findById(SellerReviewId)
		.then((sellerReviews) => {
			if (sellerReviews) {
				return sellerReviews;
			} else {
				throw new Error("Seller Review is not found");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Delete Seller Review

  export const deleteSellerReview = async (SellerReviewId) => {
	return await SellerReviewModel.findByIdAndDelete(SellerReviewId)
		.then((sellerReviews) => {
			if (sellerReviews) {
				return sellerReviews;
			} else {
				throw new Error("seller review not found");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
  