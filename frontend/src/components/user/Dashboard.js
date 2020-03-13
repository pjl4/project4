import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Dashboard extends Component {
	componentDidMount() {
		this.props.setHome();
	}
	render() {
		return (
			<div>
				<Button
					variant="outline-danger"
					href="/"
					onClick={() => {
						localStorage.clear();
					}}
				>
					Logout
				</Button>
				<Button variant="outline-info" href="/edit">
					Change Password
				</Button>
			</div>
		);
	}
}

export default Dashboard;