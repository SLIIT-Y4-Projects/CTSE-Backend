const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		stripeUserId: {
			type: String,
			required: true,
		},
		productId: {
			type: String,
			required: true,
		},
		product_name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		qty: {
			type: Number,
			required: true,
		},
		supplier: {
			type: String,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
		productImage: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			default: "pending",
			enum: ["pending", "confirmed", "dispatched", "delivered"],
		},
		isPaid: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
