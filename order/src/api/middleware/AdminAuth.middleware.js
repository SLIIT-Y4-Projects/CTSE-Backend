import axios from "axios";
import configs from "../../config";

export const checkUserIsAdmin = async (authorizationHeader) => {
	try {
		await axios.get(`${configs.auth_service}/api/auth/admin`, {
			headers: {
				Authorization: authorizationHeader,
			},
		});
		return true;
	} catch (error) {
		return false;
	}
};
