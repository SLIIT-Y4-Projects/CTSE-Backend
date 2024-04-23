import BuyerService from "../services";
import BuyerModel from "../models/Buyer.model";
import logger from "../../util/logger";
import configs from "../../config";
import axios from "axios";

// Buyer Register Controller
export const registerBuyer = async (request, response, next) => {
	if (await BuyerModel.findOne({ email: request.body.email })) {
		request.handleResponse.errorRespond(response)("Email already exists");
		next();
	} else if (await BuyerModel.findOne({ nic: request.body.nic })) {
		request.handleResponse.errorRespond(response)("NIC already Exists");
		next();
	} else {
		// Generate stripe user id using payment service
		const stripeUser = await axios.post(`${configs.payment_service}/api/payment/create-customer`, {
			name: request.body.name,
			email: request.body.email,
		});

		const Buyer = {
			stripeUserId: stripeUser.data.id,
			name: request.body.name,
			email: request.body.email,
			contact: request.body.contact,
			nic: request.body.nic,
			address: request.body.address,
			password: request.body.password,
		};

		await BuyerService.insertBuyer(Buyer)
			.then((data) => {
				logger.info(`New Buyer with ID ${data._id} created`);
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

// Buyer Login Controller
export const loginBuyer = async (request, response, next) => {
	const { email, password } = request.body;

	if (email && password) {
		await BuyerService.authenticateBuyer(email, password)
			.then(async (buyer) => {
				const authToken = await buyer.generateAuthToken();
				const data = {
					_id: buyer._id,
					stripeUserId: buyer.stripeUserId,
					email: buyer.email,
					token: authToken,
					permissionLevel: buyer.permissionLevel,
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

// Buyer Details Controller
export const getBuyerDetails = async (req, res, next) => {
	await BuyerService.getBuyerDetails(req.params.id)
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

export const getAllBuyers = async (request, response, next) => {
	await BuyerService.getAllBuyers("users")
		.then(async (data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

// Buyer edit Controller
export const editBuyerDetails = async (req, res, next) => {
	const user = {
		name: req.body.name,
		email: req.body.email,
		contact: req.body.contact,
		nic: req.body.nic,
		address: req.body.address,
		password: req.body.password,
	};

	await BuyerService.editBuyerDetails(req.params.id, user)
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

export const deleteBuyer = async (req, res, next) => {
	await BuyerService.deleteBuyer(req.params.id)
		.then((data) => {
			req.handleResponse.successRespond(res)(data);
			next();
		})
		.catch((error) => {
			req.handleResponse.errorRespond(res)(error.message);
			next();
		});
};