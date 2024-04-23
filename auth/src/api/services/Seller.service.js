import SellerModel from "../models/Seller.model";

//Insert Seller
export const insertSeller = async (seller) => {
	return await SellerModel.create(seller)
		.then(async (seller) => {
			await seller.generateAuthToken();
			return seller;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

//Seller Authentication
export const authenticateSeller = async (email, password) => {
	return await SellerModel.findOne({ email })
		.then(async (seller) => {
			if (seller && (await seller.matchPassword(password))) {
				return seller;
			} else {
				throw new Error("Invalid Email or Password!");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

//Get Seller Details
export const getSellerDetails = async (userId) => {
	return await SellerModel.findById(userId)
		.then((seller) => {
			return seller;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

//Get All Seller Details
export const getAllSellers = async () => {
	return await SellerModel.find()
		.then((seller) => {
			return seller;
		})
		.catch((errors) => {
			throw new Error(errors.message);
		});
};

// Update Seller Details
export const editSellerDetails = async (userId, Seller) => {
	return await SellerModel.findByIdAndUpdate(userId, Seller, { new: true })
		.then((Seller) => {
			return Seller;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Delete Seller
export const deleteSeller = async (userId) => {
	return await SellerModel.findByIdAndDelete(userId)
		.then((Seller) => {
			return Seller;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};