import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { saveQuote, fetchQuote, getQuotes } from "../actions";
import QuoteBlock from "../components/QuoteBlock";

class Quotes extends Component {
	constructor(props) {
		super(props);
		this.fetchQuoteHandler = this.fetchQuoteHandler.bind(this);

		this.state = {
			recentQuote: null
		}
	}

	fetchQuoteHandler() {
		this.props.fetchQuote().then(newQuote => {
			console.log(newQuote)
			this.setState({
				recentQuote: {
					id: newQuote.id,
					author: newQuote.title,
					content: newQuote.content
				}
			})
		})
	}

	render() {
		return (
			<div className="quotes">
				<QuoteBlock quote={this.state.recentQuote}/>
				<div className="button-block">
					<button onClick={this.fetchQuoteHandler}>Get Quote</button>
					<button>Save Quote</button>
				</div>
				<div>grid</div>
			</div>
		);
	}
}

Quotes.propTypes = {
	fetchQuote: PropTypes.func,
	saveQuote: PropTypes.func,
	getQuotes: PropTypes.func
};

const mapStateToProps = (state) => ({
	quotes: state.quotes
});

const mapDispatchToProps = (dispatch) => ({
	...bindActionCreators({ saveQuote, fetchQuote, getQuotes }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);
