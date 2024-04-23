const mongoose = require("mongoose");

const SellerReviewSchema = new mongoose.Schema({
	// TODO: Add more fields
	seller_id: {
		type: String,
		required: true,
	},
	review_value: {
		type: String,
		required: true,
		validate: {
			validator: function(value) {
			  return parseInt(value) >= 1 && parseInt(value) <= 5;
			},
			message: 'Review value must be between 1 and 5.'
		  }
	},
	text: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("SellerReview", SellerReviewSchema);