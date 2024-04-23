import axios from "axios";
import configs from "../../config";

export const checkUserIsBuyer = async (authorizationHeader) => {
	try {
		await axios.get(`${configs.auth_service}/api/auth/buyer`, {
			headers: {
				Authorization: authorizationHeader,
			},
		});
		return true;
	} catch (error) {
		return false;
	}
};
