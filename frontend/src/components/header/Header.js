import React, { Component } from 'react';
import { Nav, Button } from 'react-bootstrap';

class Header extends Component {
	render() {
		return (
			<Nav>
				<Nav.Item>
					<a href="/">
						<h1>Most Valuable Picks</h1>
					</a>
				</Nav.Item>
				<Nav.Item className="ml-auto">
					{!localStorage.id && (
						<Button
							href="/login"
							variant="outline-primary"
							size="lg"
						>
							Login
						</Button>
					)}
					{localStorage.firstName && (
						<h3>
							Welcome back,
							<a href="/dashboard">{localStorage.firstName}</a>
						</h3>
					)}
				</Nav.Item>
			</Nav>
		);
	}
}

export default Header;
