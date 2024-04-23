import AdminModel from "../models/Admin.model";

// Authenticate Admin
export const authenticateAdmin = async (email, password) => {
	return await AdminModel.findOne({ email })
		.then(async (admin) => {
			if (admin && (await admin.matchPassword(password))) {
				return admin;
			} else {
				throw new Error("Invalid Email or Password!");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Insert Admin
export const insertAdmin = async (admin) => {
	return await AdminModel.create(admin)
		.then(async (admin) => {
			await admin.generateAuthToken();
			return admin;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Get Admin Details
export const getAdminDetails = async (userId) => {
	return await AdminModel.findById(userId)
		.then((Admin) => {
			return Admin;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Update Admin Details
export const editAdminDetails = async (userId, Admin) => {
	return await AdminModel.findByIdAndUpdate(userId, Admin, { new: true })
		.then((Admin) => {
			return Admin;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Delete Admin
export const deleteAdmin = async (userId) => {
	return await AdminModel.findByIdAndDelete(userId)
		.then((Admin) => {
			return Admin;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
