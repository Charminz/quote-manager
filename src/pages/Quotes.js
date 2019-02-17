import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateQuote, fetchQuote, saveQuote } from "../actions";
import QuoteBlock from "../components/QuoteBlock";
import QuoteRow from "../components/QuoteRow";

class Quotes extends Component {
	constructor(props) {
		super(props);
		this.saveQuoteHandler = this.saveQuoteHandler.bind(this);
		this.fetchQuoteHandler = this.fetchQuoteHandler.bind(this);
		this.quoteDoubleClickHandler = this.quoteDoubleClickHandler.bind(this);
		this.inputChangeHandler = this.inputChangeHandler.bind(this);
		this.endEditHandler = this.endEditHandler.bind(this);
		this.endEdit = this.endEdit.bind(this);
		this.cleanUpQuote = this.cleanUpQuote.bind(this);

		this.state = {
			recentQuote: null,
			saveDisabled: true,
			edit: null,
			quoteInEdit: null
		};
	}

	fetchQuoteHandler() {
		this.props.fetchQuote().then(newQuote => {
			newQuote.content = this.cleanUpQuote(newQuote.content);

			this.setState({
				recentQuote: {
					id: newQuote.ID,
					author: newQuote.title,
					content: newQuote.content
				},
				saveDisabled: false
			});
		});
	}

	cleanUpQuote(quote) {
		const temp = document.createElement("div");
		temp.innerHTML = quote;
		return temp.textContent || temp.innerText || "";
	}

	saveQuoteHandler() {
		this.setState({
			saveDisabled: true
		});
		this.props.saveQuote(this.state.recentQuote);
	}

	quoteDoubleClickHandler(quote, ref) {
		this.setState({
			edit: {
				id: quote.id,
				ref
			},
			quoteInEdit: quote
		});
	}

	inputChangeHandler(event) {
		const quote = this.state.quoteInEdit;
		quote[ this.state.edit.ref ] = event.target.value;

		this.setState({
			quoteInEdit: quote
		});
	}

	endEditHandler(event) {
		if ( event.keyCode === 13 ) {
			this.endEdit();
		}
	}

	endEdit() {
		this.props.updateQuote(this.state.quoteInEdit);

		this.setState({
			quoteInEdit: null,
			edit: null
		});
	}

	render() {
		return (
			<div className="quotes">
				<QuoteBlock quote={this.state.recentQuote}/>
				<div className="buttons-wrapper">
					<button className="fetch-btn" onClick={this.fetchQuoteHandler}>Get Quote</button>
					<button className="save-btn" onClick={this.saveQuoteHandler} disabled={this.state.saveDisabled}>Save Quote
					</button>
				</div>
				<div className="quotes-list">
					{
						this.props.quotes.map(quote => {
							const editContent = this.state.edit && this.state.edit.id === quote.id && this.state.edit.ref === "content";
							const editAuthor = this.state.edit && this.state.edit.id === quote.id && this.state.edit.ref === "author";

							return (
								<QuoteRow
									quote={quote}
									editContent={editContent}
									editAuthor={editAuthor}
									quoteInEdit={this.state.quoteInEdit}
									onChangeHandler={this.inputChangeHandler}
									onKeyUpHandler={this.endEditHandler}
									onBlurHandler={this.endEdit}
									beginEditHandler={this.quoteDoubleClickHandler}
								/>
							);
						})
					}
				</div>
			</div>
		);
	}
}

Quotes.propTypes = {
	fetchQuote: PropTypes.func,
	saveQuote: PropTypes.func,
	updateQuote: PropTypes.func
};

const mapStateToProps = (state) => ({
	quotes: state.quotes
});

const mapDispatchToProps = (dispatch) => ({
	...bindActionCreators({ saveQuote, fetchQuote, updateQuote }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);
