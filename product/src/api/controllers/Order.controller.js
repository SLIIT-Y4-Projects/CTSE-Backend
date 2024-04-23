/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import OrderService from "../services";
import { checkUserLoggedIn } from "../middleware/Auth.middleware";
import sendMail from "../../util/sendMail";
import getCustomer from "../../util/getCustomer";

// Add one order
export const addOrder = async (request, response, next) => {
	await OrderService.addOrder(request.body)
		.then(async (data) => {
			// Get one customer
			await getCustomer(data.stripeUserId).then((customer) => {
				// Send Email
				sendMail({
					to: customer.data.email,
					subject: "Order Placed",
					templateType: "order",
					data: {
						name: customer.data.name,
						orderItems: [
							{
								productName: data.product_name,
								quantity: data.qty,
								price: data.price,
							},
						],
					},
				});
			});

			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

// TODO: Get all orders
export const getOrders = async (request, response, next) => {
	try {
		await OrderService.getOrders().then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		});
	} catch (error) {
		request.handleResponse.errorRespond(response)(error.message);
	}
};

// Get one order
export const getOrder = async (request, response, next) => {
	try {
		// Check if the user is logged in
		console.log(request.headers.authorization);
		const isLoggedIn = await checkUserLoggedIn(request.headers.authorization);
		console.log(isLoggedIn);

		if (!isLoggedIn) {
			// Handle case where user is not logged in
			return request.handleResponse.errorRespond(response)("User not logged in");
		}

		await OrderService.getOrder(request.params.orderId).then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		});
	} catch (error) {
		request.handleResponse.errorRespond(response)(error.response?.data?.details || error.message);
	}
};

// changeOrderIsPaidStatus
export const changeOrderIsPaidStatus = async (request, response, next) => {
	await OrderService.changeOrderIsPaidStatus(request.params.orderId, request.body.isPaid)
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

// changeOrderStatus
export const changeOrderStatus = async (request, response, next) => {
	await OrderService.changeOrderStatus(request.params.orderId, request.body.status)
		.then(async (data) => {
			// Get one customer
			await getCustomer(data.stripeUserId).then((customer) => {
				// Send Email
				sendMail({
					to: customer.data.email,
					subject: `Order ${data.status}`,
					templateType: `order-${data.status}`,
					data: {
						name: customer.data.name,
						orderItems: [
							{
								productName: data.product_name,
								quantity: data.qty,
								price: data.price,
							},
						],
						orderNumber: data._id,
					},
				});
			});
			request.handleResponse.successRespond(response)({ message: "Order status changed successfully" });
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

// TODO: Update a order
// Delete a order
export const deleteOrder = async (request, response, next) => {
	await OrderService.deleteOrder(request.params.orderId)
		.then(() => {
			request.handleResponse.successRespond(response)({ message: "Order deleted successfully" });
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};
