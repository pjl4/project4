var download = require('download-file');
const csv = require('csv-parser');
const fs = require('fs');
const moment = require('moment');
var url = 'http://www.thepredictiontracker.com/ncaabbpreds.csv';
const today = moment().startOf('day');
let data = {
	date: new Date(),
	data: []
};
const NCAAB = require('../db/models/NCAAB');
var options = {
	directory: '../downloads/NCAAB/',
	filename: ''
};

download(url, options, function(err) {
	if (err) throw err;
	console.log('Downloaded File');
});
let updateInfoInDB = false;
fs.createReadStream('../downloads/NCAAB/ncaabbpreds.csv')
	.pipe(csv())
	.on('data', (row) => {
		data.data.push(row);
	})
	.on('end', () => {
		console.log('CSV file successfully processed');
		console.log(
			'*********************************************************'
		);

		NCAAB.find({
			date: {
				$gte: today.toDate(),
				$lte: moment(today)
					.endOf('day')
					.toDate()
			}
		})
			.then((objects) => {
				objects.map((item) => {
					if (
						parseInt(moment(item.date).format('HH')) + 3 >
						parseInt(moment(today).format('HH'))
					) {
						updateInfoInDB = false;
					} else {
						updateInfoInDB = true;
					}
				});
			})
			.catch(console.error);
	});
if (updateInfoInDB) {
	NCAAB.create(data)
		.then((data) => console.log('Added data to DB'))
		.catch(console.error);
}
