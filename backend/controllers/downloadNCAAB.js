var download = require('download-file');
const csv = require('csv-parser');
const fs = require('fs');
var url = 'http://www.thepredictiontracker.com/ncaabbpreds.csv';
let data = {
	date: Date.now(),
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

fs.createReadStream('../downloads/NCAAB/ncaabbpreds.csv')
	.pipe(csv())
	.on('data', (row) => {
		data.data.push(row);
		console.log(row);
	})
	.on('end', () => {
		console.log('CSV file successfully processed');
		console.log(
			'*********************************************************'
		);
		NCAAB.create(data);
		console.log(data);
	});
