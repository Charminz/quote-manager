import React, { Component } from 'react';
import errorImg from "../assets/error-grave.png";

class Navbar extends Component {
	render() {
		return (
			<div className="error">
				<div>
					You are trying to enter the magical wonderland. I'm sorry, but unfortunately it does not exist.
				</div>
				<img src={errorImg} alt="Invalid page"/>
			</div>
		);
	}
}

export default Navbar;
