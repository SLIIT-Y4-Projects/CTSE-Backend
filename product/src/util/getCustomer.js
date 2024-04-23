import configs from "../config";
import axios from "axios";

const getCustomer = async (stripeUserId) => {
	const result = await axios.get(`${configs.payment_service}/api/payment/get-one-customer/${stripeUserId}`);
	return result;
};

export default getCustomer;
