const mongoose = require('../connection');

const NCAABSchema = new mongoose.Schema({
	date: {
		type: Date,
		required: true
	},
	data: {
		type: Array,
		required: true
	}
});

const NCAAB = mongoose.model('NCAAB', NCAABSchema);

module.exports = NCAAB;
