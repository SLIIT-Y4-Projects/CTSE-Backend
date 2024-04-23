import axios from "axios";
import configs from "../../config";

export const checkUserIsSeller = async (authorizationHeader) => {
	try {
		await axios.get(`${configs.auth_service}/api/auth/seller`, {
			headers: {
				Authorization: authorizationHeader,
			},
		});
		return true;
	} catch (error) {
		return false;
	}
};
