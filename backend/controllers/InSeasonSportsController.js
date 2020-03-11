const express = require('express');
const router = express.Router();
const axios = require('axios');
const url = `https://api.the-odds-api.com/v3/sports/?apiKey=588a0c26d914b3ae12d52e23b29fddb7`;

router.get('/', async (req, res) => {
	let responseObj;
	await axios
		.get(url)
		.then((res) => {
			responseObj = res.data.data;
		})
		.catch((error) => console.log(error));
	res.json(responseObj);
});

module.exports = router;
