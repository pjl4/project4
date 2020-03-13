import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
const axios = require('axios');

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPassword: null,
			newPassword: null,
			newCPassword: null,
			localError: false,
			errors: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange = (evt) => {
		evt.preventDefault();
		let value = evt.target.value;
		this.setState({ [evt.target.id]: value });
	};
	handleSubmit = (evt) => {
		evt.preventDefault();
		this.setState({ localError: false });
		if (this.state.newPassword !== this.state.newCPassword) {
			this.setState({ localError: true });
		} else {
			let putObject = {
				newPassword: this.state.newPassword,
				currentPassword: this.state.currentPassword
			};
			axios
				.put(
					'https://infinite-refuge-07856.herokuapp.com/api/user/' +
						localStorage.id,
					putObject
				)
				.then((res) => {
					if (res.data.error) {
						this.setState({ errors: res.data.error });
					} else {
						this.setState({
							errors: 'Password changed successfully!'
						});
					}
				});
		}
	};
	componentDidMount() {
		this.props.setHome();
	}
	render() {
		return (
			<Container>
				<Form>
					<Form.Group
						controlId="currentPassword"
						onChange={(evt) => this.handleChange(evt)}
					>
						<Form.Control
							type="password"
							placeholder="CurrentPassword"
						></Form.Control>
					</Form.Group>
					<Form.Group
						controlId="newPassword"
						onChange={(evt) => this.handleChange(evt)}
					>
						<Form.Control
							type="password"
							placeholder="New Password"
						></Form.Control>
					</Form.Group>
					<Form.Group
						controlId="newCPassword"
						onChange={(evt) => this.handleChange(evt)}
					>
						<Form.Control
							type="password"
							placeholder="New Password confirm"
						></Form.Control>
					</Form.Group>
					{this.state.localError && <h4>Passwords Must Match</h4>}
					{this.state.errors && <h4>{this.state.errors}</h4>}
					<Button
						onClick={(evt) => this.handleSubmit(evt)}
						variant="outline-dark"
					>
						Submit
					</Button>
				</Form>
			</Container>
		);
	}
}

export default Edit;
