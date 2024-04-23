import SellerService from "../services";
import SellerModel from "../models/Seller.model";
import logger from "../../util/logger";
import configs from "../../config";
import axios from "axios";

// Seller Register Controller
export const registerSeller = async (request, response, next) => {
	if (await SellerModel.findOne({ email: request.body.email })) {
		request.handleResponse.errorRespond(response)("Email already exists");
		next();
	} else if (await SellerModel.findOne({ nic: request.body.nic })) {
		request.handleResponse.errorRespond(response)("NIC already Exists");
		next();
	} else {
		// Generate stripe user id using payment service
		const stripeUser = await axios.post(`${configs.payment_service}/api/payment/create-customer`, {
			name: request.body.name,
			email: request.body.email,
		});

		const Seller = {
			stripeUserId: stripeUser.data.id,
			name: request.body.name,
			email: request.body.email,
			contact: request.body.contact,
			nic: request.body.nic,
			address: request.body.address,
			password: request.body.password,
		};

		await SellerService.insertSeller(Seller)
			.then((data) => {
				logger.info(`New Seller with ID ${data._id} created`);
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error) => {
				logger.error(error.message);
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	}
};

// Seller Login Controller
export const loginSeller = async (request, response, next) => {
	const { email, password } = request.body;

	if (email && password) {
		await SellerService.authenticateSeller(email, password)
			.then(async (seller) => {
				const authToken = await seller.generateAuthToken();
				const data = {
					_id: seller._id,
					stripeUserId: seller.stripeUserId,
					email: seller.email,
					token: authToken,
					permissionLevel: seller.permissionLevel,
					name : seller.name,
				};

				request.handleResponse.successRespond(response)(data);
			})
			.catch((error) => {
				const errorResponseData = {
					errorTime: new Date(),
					message: error.message,
				};

				logger.error(JSON.stringify(errorResponseData));
				request.handleResponse.errorRespond(response)(errorResponseData);
				next();
			});
	} else {
		logger.error("Username or Password is missing");
		request.handleResponse.errorRespond(response)("Username or Password is missing");
		next();
	}
};

// Seller Details Controller
export const getSellerDetails = async (req, res, next) => {
	await SellerService.getSellerDetails(req.params.id)
		.then((data) => {
			req.handleResponse.successRespond(res)(data);
			next();
		})
		.catch((error) => {
			req.handleResponse.errorRespond(res)(error.message);
			next();
		});
};

// All Buyers Controller
export const getAllSellers = async (request, response, next) => {
	await SellerService.getAllSellers("users")
		.then(async (data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

// Seller edit Controller
export const editSellerDetails = async (req, res, next) => {
	const user = {
		name: req.body.name,
		email: req.body.email,
		contact: req.body.contact,
		nic: req.body.nic,
		address: req.body.address,
		password: req.body.password,
	};

	await SellerService.editSellerDetails(req.params.id, user)
		.then((data) => {
			req.handleResponse.successRespond(res)(data);
			next();
		})
		.catch((error) => {
			req.handleResponse.errorRespond(res)(error.message);
			next();
		});
};


// Buyer delete Controller
export const deleteSeller = async (req, res, next) => {
	await SellerService.deleteSeller(req.params.id)
		.then((data) => {
			req.handleResponse.successRespond(res)(data);
			next();
		})
		.catch((error) => {
			req.handleResponse.errorRespond(res)(error.message);
			next();
		});
};