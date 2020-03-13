import React, { Component } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Header extends Component {
	render() {
		return (
			<Nav>
				<Nav.Item>
					<a href="/project4">
						<h1>Guarenteed Green</h1>
					</a>
				</Nav.Item>
				<Nav.Item className="ml-auto">
					{!localStorage.id && (
						<Link to="/login">
							<Button variant="outline-primary" size="lg">
								Login
							</Button>
						</Link>
					)}
					{localStorage.firstName && (
						<h3>
							Welcome back,
							<Link to="/dashboard">
								{localStorage.firstName}
							</Link>
						</h3>
					)}
				</Nav.Item>
			</Nav>
		);
	}
}

export default Header;
