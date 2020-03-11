const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:sport', async (req, res) => {
	let responseObj;
	await axios
		.get(
			`https://api.the-odds-api.com/v3/odds/?apiKey=588a0c26d914b3ae12d52e23b29fddb7&sport=${req.params.sport}&region=us&market=h2h`
		)
		.then(async (res) => {
			responseObj = await formatGamesObject(res.data.data);
		})
		.catch((error) => console.log(error));
	res.json(responseObj);
});
formatGamesObject = async (games) => {
	let formattedGames = [];
	let currentGame;
	for (let i = 0; i < games.length; i++) {
		if (games[i].sites_count > 0) {
			let lines = games[i].sites[0].odds.h2h.length;
			if (lines === 3) {
				currentGame = createThreeLinesObject(games[i]);
				currentGame.lines = 3;
			} else {
				currentGame = createTwoLinesObject(games[i]);
				currentGame.lines = 2;
			}
			currentGame.startTime = getCurrentTime(games[i].commence_time);
			formattedGames.push(currentGame);
		} else {
		}
	}
	return formattedGames;
};

getCurrentTime = (unixTime) => {
	let dateObj = new Date(unixTime * 1000);
	let time = dateObj.toTimeString();
	return time;
};
threeWayOddsCalculation = (oneOdds, twoOdds, drawOdds) => {
	const onePercent = 1 / oneOdds;
	const twoPercent = 1 / twoOdds;
	const drawPercent = 1 / drawOdds;

	return (onePercent + twoPercent + drawPercent) * 100;
};
twoWayOddsCalculation = (oneOdds, twoOdds, drawOdds) => {
	const onePercent = 1 / oneOdds;
	const twoPercent = 1 / twoOdds;
	return (onePercent + twoPercent) * 100;
};

createThreeLinesObject = (game) => {
	let currentGame = {};
	currentGame.teamOne = game.teams[0];
	currentGame.teamTwo = game.teams[1];
	currentGame.teamOneOdds = 0;
	currentGame.teamTwoOdds = 0;
	currentGame.drawOdds = 0;
	for (let i = 0; i < game.sites.length; i++) {
		if (game.sites[i].odds.h2h[0] > currentGame.teamOneOdds) {
			currentGame.teamOneOdds = game.sites[i].odds.h2h[0];
			currentGame.teamOneOddsSite = game.sites[i].site_nice;
		}
		if (game.sites[i].odds.h2h[1] > currentGame.teamTwoOdds) {
			currentGame.teamTwoOdds = game.sites[i].odds.h2h[1];
			currentGame.teamTwoOddsSite = game.sites[i].site_nice;
		}
		if (game.sites[i].odds.h2h[2] > currentGame.drawOdds) {
			currentGame.drawOdds = game.sites[i].odds.h2h[2];
			currentGame.drawOddsSite = game.sites[i].site_nice;
		}
	}
	currentGame.arbitragePercent = threeWayOddsCalculation(
		currentGame.teamOneOdds,
		currentGame.teamTwoOdds,
		currentGame.drawOdds
	).toFixed(2);
	if (currentGame.arbitragePercent > 100) {
		currentGame.arbitrageOppurtunity = false;
	} else {
		currentGame.arbitrageOppurtunity = true;
	}
	return currentGame;
};
createTwoLinesObject = (game) => {
	let currentGame = {};
	currentGame.teamOne = game.teams[0];
	currentGame.teamTwo = game.teams[1];
	currentGame.teamOneOdds = 0;
	currentGame.teamTwoOdds = 0;
	for (let i = 0; i < game.sites.length; i++) {
		if (game.sites[i].odds.h2h[0] > currentGame.teamOneOdds) {
			currentGame.teamOneOdds = game.sites[i].odds.h2h[0];
			currentGame.teamOneOddsSite = game.sites[i].site_nice;
		}
		if (game.sites[i].odds.h2h[1] > currentGame.teamTwoOdds) {
			currentGame.teamTwoOdds = game.sites[i].odds.h2h[1];
			currentGame.teamTwoOddsSite = game.sites[i].site_nice;
		}
	}
	currentGame.arbitragePercent = twoWayOddsCalculation(
		currentGame.teamOneOdds,
		currentGame.teamTwoOdds
	).toFixed(2);
	if (currentGame.arbitragePercent > 100) {
		currentGame.arbitrageOppurtunity = false;
	} else {
		currentGame.arbitrageOppurtunity = true;
	}
	return currentGame;
};
module.exports = router;
