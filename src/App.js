import React, { Component } from 'react';
import Navbar from "./components/Navbar";
import Quotes from "./pages/Quotes";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";


class App extends Component {
	render() {
		return (
			<div className="App">
				<Navbar/>
				<Provider store={store}>
					<Switch>
						<Route exact path="/" component={Quotes}/>
						<Route path="/about" component={About}/>
						<Route component={ErrorPage}/>
					</Switch>
				</Provider>
			</div>
		);
	}
}

export default App;
