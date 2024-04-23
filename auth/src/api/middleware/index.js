import { admin_auth } from "./AdminAuth.middleware";
import { user_auth } from "./Auth.middleware";
import { seller_auth } from "./SellerAuth.middleware";

export default {
	admin_auth,
	user_auth,
	seller_auth,
};
