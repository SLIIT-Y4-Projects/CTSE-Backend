import SellerReviewService from "../services";

// Insert one seller review
export const insertSellerReview = async (request, response, next) => {
	await SellerReviewService.insertSellerReview(request.body)
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

// Get all seller review
export const getAllSellerReviews = async (request, response, next) => {
	await SellerReviewService.getAllSellerReviews("seller")
		.then(async (data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

// Get one seller review
export const getOneSellerReview = async (request, response, next) => {
	await SellerReviewService.getOneSellerReview(request.params.id)
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

  
  export const deleteSellerReview = async (request, response, next) => {
	await SellerReviewService.deleteSellerReview(request.params.id)
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		})};