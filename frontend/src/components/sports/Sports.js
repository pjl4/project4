import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';
class Sports extends Component {
	render() {
		return (
			<Col lg={4}>
				<Button
					block
					variant="outline-secondary"
					onClick={() =>
						this.props.setClickedSport(this.props.sport.key)
					}
				>
					{this.props.sport.title}
				</Button>
			</Col>
		);
	}
}

export default Sports;
