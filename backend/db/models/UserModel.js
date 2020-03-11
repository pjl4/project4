const mongoose = require('../connection');

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true
		},
		pwHash: {
			type: String,
			required: true
		},
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		admin: {
			type: Boolean,
			default: false
		},
		bets: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Bet'
		}
	},
	{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
