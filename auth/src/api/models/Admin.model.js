const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";

const AdminSchema = new mongoose.Schema(
	{
		stripeUserId: {
			type: String,
			required: false,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		permissionLevel: {
			type: String,
			default: "ADMIN",
			required: true,
		},
		authToken: {
			type: String,
			required: false,
		},
		deletedAt: {
			type: Date,
			required: false,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

AdminSchema.pre("save", async function (next) {
	const user = this;
	const password = user.password;

	if (!user.isModified("password")) {
		return next();
	}

	// Number of rounds hash function will execute
	const salt = await bcrypt.genSalt(10);

	const hash = await bcrypt.hashSync(password, salt);
	user.password = hash;
	return next();
});

AdminSchema.methods.generateAuthToken = async function () {
	const user = this;
	const secret = process.env.JWT_SECRET;

	const authToken = jwt.sign(
		{
			_id: user._id,
			stripeUserId: user.stripeUserId,
			permissionLevel: user.permissionLevel,
		},
		secret
	);
	user.authToken = authToken;
	await user.save();
	return authToken;
};

AdminSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Admin", AdminSchema);
