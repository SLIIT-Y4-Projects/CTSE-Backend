import dotenv from "dotenv";
dotenv.config();
const environment = process.env.NODE_ENV?.trim();
let configs;

if (environment == "Development") {
	configs = {
		ip: process.env.IP || "localhost",
		port: process.env.PORT || "5001",
		environment: process.env.DEV_ENVIRONMENT,
		mongodb: {
			uri: process.env.DEV_MONGO_URI,
		},
		payment_service: process.env.DEV_PAYMENT_SERVICE,
	};
}

if (environment == "Production") {
	configs = {
		ip: process.env.IP || "localhost",
		port: process.env.PORT || "5001",
		environment: process.env.PROD_ENVIRONMENT,
		mongodb: {
			uri: process.env.DEV_MONGO_URI,
		},
		payment_service: process.env.K8S_PAYMENT_SERVICE,
	};
}

export default configs;
