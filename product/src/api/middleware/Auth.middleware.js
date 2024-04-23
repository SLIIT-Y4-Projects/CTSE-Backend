import axios from "axios";
import configs from "../../config";

export const checkUserLoggedIn = async (authorizationHeader) => {
	try {
		await axios.get(`${configs.auth_service}/api/auth/user`, {
			headers: {
				Authorization: authorizationHeader,
			},
		});
		return true;
	} catch (error) {
		return false;
	}
};
