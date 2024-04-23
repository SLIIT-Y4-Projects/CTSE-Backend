import ProductReviewModel from "../models/Product.Review.model";

// Insert one Product Review
export const insertProductReview = async (ProductReviewData) => {
	return await ProductReviewModel.create(ProductReviewData)
		.then(async (productReviews) => {
			await productReviews.save();
			return productReviews;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Get all Product Reviews
export const getAllProductReviews= async () => {
	return await ProductReviewModel.find({})
		.then((productReviews) => {
			return productReviews;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Get one Product Review
export const getOneProductReview = async (SellerReviewId) => {
	return await ProductReviewModel.findById(SellerReviewId)
		.then((productReviews) => {
			if (productReviews) {
				return productReviews;
			} else {
				throw new Error("Product Review is not found");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
