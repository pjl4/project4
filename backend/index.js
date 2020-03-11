const express = require('express');
const app = express();
const cors = require('cors');
const UserController = require('./controllers/userController');
const BetController = require('./controllers/betController');
const InSeasonSportsController = require('./controllers/InSeasonSportsController');
const GetOddsController = require('./controllers/GetOddsController');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/user', UserController);
app.use('/api/bet', BetController);
app.use('/api/getsports', InSeasonSportsController);
app.use('/api/sports', GetOddsController);
app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
