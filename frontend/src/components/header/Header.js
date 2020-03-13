import React, { Component } from 'react';
import { Nav, Button } from 'react-bootstrap';

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
						<Button
							href="/project4/login"
							variant="outline-primary"
							size="lg"
						>
							Login
						</Button>
					)}
					{localStorage.firstName && (
						<h3>
							Welcome back,
							<a href="/project4/dashboard">
								{localStorage.firstName}
							</a>
						</h3>
					)}
				</Nav.Item>
			</Nav>
		);
	}
}

export default Header;
