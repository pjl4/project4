import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');

class Create extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: null,
			lastName: null,
			password: null,
			email: null,
			cPassword: null,
			localError: false,
			errors: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		this.props.setHome();
	}
	handleChange = (evt) => {
		evt.preventDefault();
		let value = evt.target.value;
		this.setState({ [evt.target.id]: value });
	};
	handleSubmit = (evt) => {
		evt.preventDefault();
		this.setState({ localError: false });
		if (this.state.password !== this.state.cPassword) {
			this.setState({ localError: true });
		}
		let postObject = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			pwHash: this.state.password,
			email: this.state.email
		};
		axios.post('http://localhost:8080/api/user', postObject).then((res) => {
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
						controlId="firstName"
						onChange={(evt) => this.handleChange(evt)}
					>
						<Form.Control
							type="text"
							placeholder="Marty"
						></Form.Control>
					</Form.Group>
					<Form.Group
						controlId="lastName"
						onChange={(evt) => this.handleChange(evt)}
					>
						<Form.Control
							type="test"
							placeholder="McFly"
						></Form.Control>
					</Form.Group>
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
					<Form.Group
						controlId="cPassword"
						onChange={(evt) => this.handleChange(evt)}
					>
						<Form.Control
							type="password"
							placeholder="Confirm Password"
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

export default Create;
