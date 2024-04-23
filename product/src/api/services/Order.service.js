import OrderModel from "../models/Order.model";

// Add one order
export const addOrder = async (orderData) => {
	return await OrderModel.create(orderData)
		.then(async (order) => {
			await order.save();
			return order;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Get all orders
export const getOrders = async () => {
	return await OrderModel.find()
		.then((orders) => {
			if (orders) {
				return orders;
			} else {
				throw new Error("Orders not found");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Get one order
export const getOrder = async (orderId) => {
	return await OrderModel.findById(orderId)
		.then((order) => {
			if (order) {
				return order;
			} else {
				throw new Error("Order not found");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Change order's isPaid status
export const changeOrderIsPaidStatus = async (orderId, isPaid) => {
	return await OrderModel.findByIdAndUpdate(orderId, { isPaid: isPaid }, { new: true })
		.then((order) => {
			if (order) {
				return order;
			} else {
				throw new Error("Order not found");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Change order's status
export const changeOrderStatus = async (orderId, status) => {
	return await OrderModel.findByIdAndUpdate(orderId, { status: status }, { new: true })
		.then((order) => {
			if (order) {
				return order;
			} else {
				throw new Error("Order not found");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// TODO: Update a order
// Delete a order
export const deleteOrder = async (orderId) => {
	return await OrderModel.findByIdAndDelete(orderId)
		.then((order) => {
			if (order) {
				return order;
			} else {
				throw new Error("Order not found");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
