import React from 'react';
import Header from './components/header/Header';
import { Route, Switch } from 'react-router-dom';
import Login from './components/user/Login';
import './App.css';
import Create from './components/user/Create';
import Dashboard from './components/user/Dashboard';
import SportsList from './components/sports/SportsList';
import Odds from './components/odds/Odds';
import Edit from './components/user/Edit';
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
					.get(
						`https://infinite-refuge-07856.herokuapp.com/api/sports/${clickedSport}`
					)
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
		let loadSports = localStorage.id && this.state.home;
		let noOddsData =
			this.state.formattedGames.length === 0 &&
			this.state.home &&
			!this.state.loading &&
			localStorage.id;
		return (
			<div className="App">
				<Header></Header>
				{loadSports && (
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
					<Route
						exact
						path="/user"
						render={(routerProps) => {
							return (
								<Create
									props={routerProps}
									setHome={this.setHome}
								></Create>
							);
						}}
					></Route>
					<Route
						exact
						path="/dashboard"
						render={() => {
							return (
								<Dashboard setHome={this.setHome}></Dashboard>
							);
						}}
					></Route>
					<Route
						exact
						path="/edit"
						render={() => {
							return <Edit setHome={this.setHome}></Edit>;
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
				{noOddsData && <h1>No Odds data to display</h1>}
				{this.state.formattedGames.length > 0 &&
					this.state.formattedGames.map((game, index) => (
						<Odds key={index} game={game}></Odds>
					))}
				{!loadSports && <h3>Log In to see in season sports</h3>}
			</div>
		);
	}
}

export default App;
