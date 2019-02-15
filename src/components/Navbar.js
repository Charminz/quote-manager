import React, { Component } from 'react';
import { Link } from "react-router-dom"

class Navbar extends Component {
    render() {
        return (
            <div className="nav-container">
                <Link className="nav-item" to="/">Quotes</Link>
                <Link className="nav-item" to="/about">About</Link>
            </div>
        );
    }
}

export default Navbar;
