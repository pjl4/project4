import React, { Component } from 'react';
import Sports from './Sports';
import { Container, Row } from 'react-bootstrap';
const axios = require('axios');
const url = `http://localhost:8080/api/getsports/`;
class SportsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sports: []
		};
	}
	componentDidMount() {
		axios
			.get(url)
			.then((res) => {
				this.setState({ sports: res.data });
			})
			.catch((error) => console.log(error));
	}
	render() {
		return (
			<section className="sports">
				<Container>
					<Row>
						{this.state.sports.length > 0 &&
							this.state.sports.map((sport, index) => (
								<Sports
									setClickedSport={this.props.setClickedSport}
									key={sport.key}
									sport={sport}
								></Sports>
							))}
					</Row>
				</Container>
			</section>
		);
	}
}

export default SportsList;
