import React, {Component} from 'react';
import './style/App.scss';
import Navbar from "./components/Navbar"
import Quotes from "./pages/Quotes"
import About from "./pages/About"
import ErrorPage from "./pages/ErrorPage"
import {Switch, Route} from "react-router-dom"

class App extends Component {
	render() {
		return (
			<div className="App">
				<Navbar/>
				<Switch>
					<Route exact path="/" component={Quotes}/>
					<Route path="/about" component={About}/>
					<Route component={ErrorPage}/>
				</Switch>
			</div>
		);
	}
}

export default App;
