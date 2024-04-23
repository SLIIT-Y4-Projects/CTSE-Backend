const jwt = require("jsonwebtoken");
import logger from "../../util/logger";
import BuyerModel from "../models/Buyer.model";

export const buyer_auth = async (request, response, next) => {
	try {
		const secret = process.env.JWT_SECRET;

		if (secret) {
			if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
				const authToken = request.headers.authorization.split(" ")[1];
				const decode = jwt.verify(authToken, secret);
				const buyer = await BuyerModel.findOne({
					_id: decode,
					authToken: authToken,
				});

				if (!buyer) {
					// throw new Error(useNotFoundResponse);
					return request.handleResponse.unauthorizedRespond(response)("Buyer not found");
				}

				request.authToken = authToken;
				request.buyer = buyer;

				logger.info(`Authentication Token for ID ${buyer._id} is Accepted`);
				next();
			} else {
				// response.status(401);
				// throw new Error("Not authorized, no token");
				request.handleResponse.unauthorizedRespond(response)("Not authorized, no token");
			}
		} else {
			// throw new Error("Token Secret is not found");
			request.handleResponse.unauthorizedRespond(response)("Token Secret is not found");
		}
	} catch (error) {
		logger.warn(error.message);
		return request.handleResponse.unauthorizedRespond(response)(error.message);
	}
};
