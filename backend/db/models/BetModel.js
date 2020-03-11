const mongoose = require('../connection');

const BetSchema = new mongoose.Schema(
	{
		home: {
			type: String,
			required: true
		},
		away: {
			type: String,
			required: true
		},
		HomeOdds: {
			type: String,
			required: true
		},
		AwayOdds: {
			type: String,
			required: true
		},
		drawOdds: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

const Bet = mongoose.model('Bet', BetSchema);
module.exports = Bet;
