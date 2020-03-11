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
					href="/moviesFrontend"
					onClick={() => {
						localStorage.clear();
					}}
				>
					Logout
				</Button>
			</div>
		);
	}
}

export default Dashboard;
