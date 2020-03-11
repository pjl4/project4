import React from 'react';
import Header from './components/header/Header';
import { Route, Switch } from 'react-router-dom';
import Login from './components/user/Login';
import './App.css';
import Create from './components/user/Create';
import Dashboard from './components/user/Dashboard';
import SportsList from './components/sports/SportsList';
import Odds from './components/odds/Odds';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';

const axios = require('axios');
const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clickedSport: null,
			formattedGames: [],
			loading: false,
			home: true
		};
	}
	setClickedSport = (clickedSport) => {
		console.log('clicked sport');
		this.setState(
			{ clickedSport, loading: true, formattedGames: [] },
			async () => {
				await axios
					.get(`http://localhost:8080/api/sports/${clickedSport}`)
					.then((res) => {
						console.log(res);
						this.setState({
							formattedGames: res.data,
							loading: false
						});
					})
					.catch(console.error);
			}
		);
	};
	setHome = () => {
		this.setState({ home: false });
	};

	render() {
		return (
			<div className="App">
				<Header></Header>
				{localStorage.id && this.state.home && (
					<SportsList
						setClickedSport={this.setClickedSport}
					></SportsList>
				)}
				<Switch>
					<Route
						exact
						path="/login"
						render={(routerProps) => {
							return (
								<Login
									props={routerProps}
									setHome={this.setHome}
								></Login>
							);
						}}
					></Route>
					<Route exact path="/user" component={Create}></Route>
					<Route
						exact
						path="/dashboard"
						render={() => {
							return (
								<Dashboard setHome={this.setHome}></Dashboard>
							);
						}}
					></Route>
				</Switch>
				{this.state.loading && (
					<ClipLoader
						css={override}
						size={100}
						color={'#red'}
						loading={this.state.loading}
					/>
				)}
				{this.state.formattedGames.length === 0 &&
					this.state.home &&
					!this.state.loading &&
					localStorage.id && <h1>No Odds data to display</h1>}
				{this.state.formattedGames.length > 0 &&
					this.state.formattedGames.map((game, index) => (
						<Odds key={index} game={game}></Odds>
					))}
				{!localStorage.id && this.state.home && (
					<h3>Log In to see in season sports</h3>
				)}
			</div>
		);
	}
}

export default App;
