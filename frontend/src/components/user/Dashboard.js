import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Dashboard extends Component {
	componentDidMount() {
		this.props.setHome();
	}
	render() {
		return (
			<div>
				<Link to="/project4">
					<Button
						variant="outline-danger"
						onClick={() => {
							localStorage.clear();
						}}
					>
						Logout
					</Button>
				</Link>
				<Link to="/edit">
					<Button variant="outline-info" href="/project4/edit">
						Change Password
					</Button>
				</Link>
			</div>
		);
	}
}

export default Dashboard;
