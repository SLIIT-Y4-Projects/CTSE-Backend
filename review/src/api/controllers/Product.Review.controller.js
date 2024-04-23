import ProductReviewService from "../services";

// Insert one product review
export const insertProductReview = async (request, response, next) => {
	await ProductReviewService.insertProductReview(request.body)
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

// Get all product reviews
export const getAllProductReviews = async (request, response, next) => {
	await ProductReviewService.getAllProductReviews("product")
		.then(async (data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

// Get one product review
export const getOneProductReview = async (request, response, next) => {
	await ProductReviewService.getOneProductReview(request.params.id)
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};