import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
const axios = require('axios');

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: null,
			email: null,
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

		let postObject = {
			password: this.state.password,
			email: this.state.email
		};
		axios
			.post('http://localhost:8080/api/user/login', postObject)
			.then((res) => {
				if (res.data.error) {
					this.setState({ errors: res.data.error });
				} else {
					localStorage.setItem('id', res.data._id);
					localStorage.setItem('firstName', res.data.firstName);
					this.props.history.push('/');
				}
			});
	};
	render() {
		return (
			<Container>
				<Form>
					<Form.Group
						controlId="email"
						onChange={(evt) => this.handleChange(evt)}
					>
						<Form.Control
							type="email"
							placeholder="martymcfly@88.com"
						></Form.Control>
					</Form.Group>
					<Form.Group
						controlId="password"
						onChange={(evt) => this.handleChange(evt)}
					>
						<Form.Control
							type="password"
							placeholder="Password"
						></Form.Control>
					</Form.Group>
					{this.state.errors && <h4>{this.state.errors}</h4>}
					<Button
						variant="outline-dark"
						onClick={(evt) => this.handleSubmit(evt)}
					>
						Submit
					</Button>
				</Form>
			</Container>
		);
	}
}

export default Login;
