import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Navbar extends Component {
	render() {
		return (
			<div className="nav-container">
				<NavLink className="nav-item" activeClassName="active-tab" exact to="/">Quotes</NavLink>
				<NavLink className="nav-item" activeClassName="active-tab" to="/about">About</NavLink>
			</div>
		);
	}
}

export default Navbar;
