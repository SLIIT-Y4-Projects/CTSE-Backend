const jwt = require("jsonwebtoken");
import logger from "../../util/logger";
import AdminModel from "../models/Admin.model";
import BuyerModel from "../models/Buyer.model";
import SellerModel from "../models/Seller.model";

export const user_auth = async (request, response, next) => {
	try {
		const secret = process.env.JWT_SECRET;

		if (secret) {
			if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
				const authToken = request.headers.authorization.split(" ")[1];
				const decode = jwt.verify(authToken, secret);

				let user;

				if (decode.permissionLevel === "ADMIN") {
					user = await AdminModel.findOne({
						_id: decode,
						authToken: authToken,
					});
				} else if (decode.permissionLevel === "BUYER") {
					user = await BuyerModel.findOne({
						id: decode,
						authToken: authToken,
					});
				} else if (decode.permissionLevel === "SELLER") {
					user = await SellerModel.findOne({
						id: decode,
						authToken: authToken,
					});
				}

				if (!user) {
					return request.handleResponse.unauthorizedRespond(response)("User not found");
				}

				request.authToken = authToken;
				request.user = user;
				request.userRole = decode.permissionLevel;

				logger.info(`Authentication Token for ID ${user._id} with role ${decode.permissionLevel} is Accepted`);
				next();
			} else {
				request.handleResponse.unauthorizedRespond(response)("Not authorized, no token");
			}
		} else {
			request.handleResponse.unauthorizedRespond(response)("Token Secret is not found");
		}
	} catch (error) {
		logger.warn(error.message);
		return request.handleResponse.unauthorizedRespond(response)(error.message);
	}
};
