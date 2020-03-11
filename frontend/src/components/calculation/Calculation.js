import React, { Component } from 'react';
import { Button, Form, Container, FormGroup } from 'react-bootstrap';
import './calculation.css';

class Calculation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null,
			winnings: null,
			teamOneBetAmount: null,
			teamTwoBetAmount: null,
			drawBetAmount: null
		};
	}
	onChange = (evt) => {
		this.setState({ value: evt.target.value });
	};
	calculateWinnings = (evt) => {
		evt.preventDefault();
		let value = this.state.value;
		if (this.props.game.lines === 3) {
			let teamOneBetPercent = (1 / this.props.game.teamOneOdds) * 100;
			let teamTwoBetPercent = (1 / this.props.game.teamTwoOdds) * 100;
			let drawBetPercent = (1 / this.props.game.drawOdds) * 100;

			let teamOneBetAmount = (
				(value * teamOneBetPercent) /
				this.props.game.arbitragePercent
			).toFixed(0);
			let teamTwoBetAmount = (
				(value * teamTwoBetPercent) /
				this.props.game.arbitragePercent
			).toFixed(0);
			let drawBetAmount = (
				(value * drawBetPercent) /
				this.props.game.arbitragePercent
			).toFixed(0);
			let winnings =
				(value / this.props.game.arbitragePercent) * 100 - value;
			this.setState({
				teamOneBetAmount,
				teamTwoBetAmount,
				drawBetAmount,
				winnings
			});
		} else {
			let teamOneBetPercent = (1 / this.props.game.teamOneOdds) * 100;
			let teamTwoBetPercent = (1 / this.props.game.teamTwoOdds) * 100;

			let teamOneBetAmount = (
				(value * teamOneBetPercent) /
				this.props.game.arbitragePercent
			).toFixed(0);
			let teamTwoBetAmount = (
				(value * teamTwoBetPercent) /
				this.props.game.arbitragePercent
			).toFixed(0);
			let winnings = (
				(value / this.props.game.arbitragePercent) * 100 -
				value
			).toFixed(0);
			this.setState({ teamOneBetAmount, teamTwoBetAmount, winnings });
		}
	};
	render() {
		let game = this.props.game;
		const lines = this.props.game.lines;
		if (lines === 2) {
			return (
				<Container>
					<h4>Calculation</h4>
					<Form>
						<Form.Group>
							<Form.Label htmlFor="stake">
								Enter Total Stake:
							</Form.Label>
							<Form.Control
								onChange={this.onChange}
								name="stake"
								placeholder="100"
							></Form.Control>
							<Button
								variant="outline-success"
								onClick={this.calculateWinnings}
							>
								Calculate
							</Button>
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="teamOneOdds">
								{game.teamOne}
							</Form.Label>
							<Form.Control
								name="teamOneOdds"
								readOnly
								value={game.teamOneOdds}
							></Form.Control>
							{this.state.teamOneBetAmount && (
								<Form.Control
									className="wager"
									readOnly
									value={`Wager: ${this.state.teamOneBetAmount}`}
								></Form.Control>
							)}
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="teamTwoOdds">
								{game.teamTwo}
							</Form.Label>
							<Form.Control
								name="teamTwoOdds"
								readOnly
								value={game.teamTwoOdds}
							></Form.Control>
							{this.state.teamTwoBetAmount && (
								<Form.Control
									className="wager"
									readOnly
									value={`Wager: ${this.state.teamTwoBetAmount}`}
								></Form.Control>
							)}
						</Form.Group>
						<Form.Group>
							{this.state.winnings && (
								<Form.Control
									className={`${game.arbitrageOppurtunity}`}
									readOnly
									value={`Profit: ${this.state.winnings}`}
								></Form.Control>
							)}
						</Form.Group>
					</Form>
				</Container>
			);
		} else {
			return (
				<Container>
					<h4>Calculation</h4>
					<Form>
						<Form.Group>
							<Form.Label htmlFor="stake">
								Enter Total Stake:
							</Form.Label>
							<Form.Control
								onChange={this.onChange}
								name="stake"
								placeholder="100"
							></Form.Control>
							<Button
								variant="outline-success"
								onClick={this.calculateWinnings}
							>
								Calculate
							</Button>
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="teamOneOdds">
								{game.teamOne}
							</Form.Label>
							<Form.Control
								name="teamOneOdds"
								readOnly
								value={game.teamOneOdds}
							></Form.Control>
							{this.state.teamOneBetAmount && (
								<Form.Control
									className="wager"
									readOnly
									value={`Wager: ${this.state.teamOneBetAmount}`}
								></Form.Control>
							)}
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="teamTwoOdds">
								{game.teamTwo}
							</Form.Label>
							<Form.Control
								name="teamTwoOdds"
								readOnly
								value={game.teamTwoOdds}
							></Form.Control>
							{this.state.teamTwoBetAmount && (
								<Form.Control
									className="wager"
									readOnly
									value={`Wager: ${this.state.teamTwoBetAmount}`}
								></Form.Control>
							)}
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="drawOdds">Draw</Form.Label>
							<Form.Control
								name="drawOdds"
								readOnly
								value={game.drawOdds}
							></Form.Control>
							{this.state.drawBetAmount && (
								<Form.Control
									className="wager"
									readOnly
									value={`Wager: ${this.state.drawBetAmount}`}
								></Form.Control>
							)}
						</Form.Group>
						<Form.Group>
							{this.state.winnings && (
								<Form.Control
									className={`${game.arbitrageOppurtunity}`}
									readOnly
									value={`Profit: ${this.state.winnings}`}
								></Form.Control>
							)}
						</Form.Group>
					</Form>
				</Container>
			);
		}
	}
}

export default Calculation;
