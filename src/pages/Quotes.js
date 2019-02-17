import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateQuote, fetchQuote, saveQuote, removeQuote } from "../actions";
import NewQuote from "../components/NewQuote";
import QuoteRow from "../components/QuoteRow";

class Quotes extends Component {
	constructor(props) {
		super(props);
		this.saveQuoteHandler = this.saveQuoteHandler.bind(this);
		this.fetchQuoteHandler = this.fetchQuoteHandler.bind(this);
		this.beginQuoteEdit = this.beginQuoteEdit.bind(this);
		this.inputChangeHandler = this.inputChangeHandler.bind(this);
		this.endQuoteEditOnKeyPress = this.endQuoteEditOnKeyPress.bind(this);
		this.endQuoteEdit = this.endQuoteEdit.bind(this);
		this.cleanUpQuote = this.cleanUpQuote.bind(this);
		this.deleteQuote = this.deleteQuote.bind(this);

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
			newQuote.title = this.cleanUpQuote(newQuote.title);

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

	beginQuoteEdit(quote, ref) {
		this.setState({
			edit: {
				id: quote.id,
				ref
			},
			quoteInEdit: JSON.parse(JSON.stringify(quote))
		});
	}

	inputChangeHandler(event) {
		const quote = this.state.quoteInEdit;
		quote[this.state.edit.ref] = event.target.value;

		this.setState({
			quoteInEdit: quote
		});
	}

	endQuoteEditOnKeyPress(event) {
		// On enter save and end the editing
		if (event.keyCode === 13) {
			this.endQuoteEdit();
		}

		// On ESC end the editing
		if (event.keyCode === 27) {
			this.endQuoteEdit(false);
		}
	}

	endQuoteEdit(shouldUpdate = true) {
		if (shouldUpdate) this.props.updateQuote(this.state.quoteInEdit);

		this.setState({
			quoteInEdit: null,
			edit: null
		});
	}

	deleteQuote(id) {
		this.props.removeQuote(id);
	}

	render() {
		return (
			<div className="quotes">
				<NewQuote quote={this.state.recentQuote} loading={this.props.loading}/>
				<div className="buttons-wrapper">
					<button className="fetch-btn" onClick={this.fetchQuoteHandler}>Get Quote</button>
					<button className="save-btn" onClick={this.saveQuoteHandler} disabled={this.state.saveDisabled}>Save Quote
					</button>
				</div>
				<div className="quotes-list">
					{
						this.props.quotes.map((quote, index) => {
							const editContent = this.state.edit && this.state.edit.id === quote.id && this.state.edit.ref === "content";
							const editAuthor = this.state.edit && this.state.edit.id === quote.id && this.state.edit.ref === "author";

							return (
								<QuoteRow
									key={index}
									quote={quote}
									editContent={editContent}
									editAuthor={editAuthor}
									quoteInEdit={this.state.quoteInEdit}
									onChangeHandler={this.inputChangeHandler}
									onKeyUpHandler={this.endQuoteEditOnKeyPress}
									onBlurHandler={this.endQuoteEdit}
									beginEditHandler={this.beginQuoteEdit}
									deleteHandler={this.deleteQuote}
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
	updateQuote: PropTypes.func,
	removeQuote: PropTypes.func
};

const mapStateToProps = (state) => ({
	quotes: state.quotes,
	loading: state.loading
});

const mapDispatchToProps = (dispatch) => ({
	...bindActionCreators({ saveQuote, fetchQuote, updateQuote, removeQuote }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);
