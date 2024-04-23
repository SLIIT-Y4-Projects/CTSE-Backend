import BuyerModel from "../models/Buyer.model";

//Insert Buyer
export const insertBuyer = async (buyer) => {
	return await BuyerModel.create(buyer)
		.then(async (buyer) => {
			await buyer.generateAuthToken();
			return buyer;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

//Buyer Authentication
export const authenticateBuyer = async (email, password) => {
	return await BuyerModel.findOne({ email })
		.then(async (buyer) => {
			if (buyer && (await buyer.matchPassword(password))) {
				return buyer;
			} else {
				throw new Error("Invalid Email or Password!");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

//Get Buyer Details
export const getBuyerDetails = async (userId) => {
	return await BuyerModel.findById(userId)
		.then((buyer) => {
			return buyer;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

//Get All Buyers Details
export const getAllBuyers = async () => {
	return await BuyerModel.find()
		.then((buyers) => {
			return buyers;
		})
		.catch((errors) => {
			throw new Error(errors.message);
		});
};

// Update Buyer Details
export const editBuyerDetails = async (userId, Buyer) => {
	return await BuyerModel.findByIdAndUpdate(userId, Buyer, { new: true })
		.then((Buyer) => {
			return Buyer;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Delete Buyer
export const deleteBuyer = async (userId) => {
	return await BuyerModel.findByIdAndDelete(userId)
		.then((Buyer) => {
			return Buyer;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
