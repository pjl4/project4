const express = require('express');
const router = express.Router();

const Bet = require('../db/models/BetModel');

router.post('/', (req, res) => {
	Bet.create(req.body)
		.then((bet) => res.json(bet))
		.catch(console.error);
});
module.exports = router;
