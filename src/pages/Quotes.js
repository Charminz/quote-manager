import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editQuote, fetchQuote, saveQuote } from "../actions";
import QuoteBlock from "../components/QuoteBlock";

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
			edit: null
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

	quoteDoubleClickHandler(id, ref) {
		this.setState({
			edit: {
				id,
				ref
			}
		});
	}

	inputChangeHandler(event, quote) {
		quote[ this.state.edit.ref ] = event.target.value;

		this.props.editQuote(quote);
	}

	endEditHandler(event) {
		if ( event.keyCode === 13 ) {
			this.endEdit();
		}
	}

	endEdit() {
		this.setState({
			edit: null
		});
	}

	render() {
		return (
			<div className="quotes">
				<QuoteBlock quote={this.state.recentQuote}/>
				<div className="button-block">
					<button onClick={this.fetchQuoteHandler}>Get Quote</button>
					<button onClick={this.saveQuoteHandler} disabled={this.state.saveDisabled}>Save Quote</button>
				</div>
				<div className="quotes-list">
					{
						this.props.quotes.map(quote => {
							const editContent = this.state.edit && this.state.edit.id === quote.id && this.state.edit.ref === "content";
							const editAuthor = this.state.edit && this.state.edit.id === quote.id && this.state.edit.ref === "author";

							return (
								<div key={quote.id}>
									{
										editContent ? (
											<textarea
												className="quote-edit"
												autoFocus
												value={quote.content}
												onChange={(e) => this.inputChangeHandler(e, quote)}
												onKeyUp={this.endEditHandler}
												onBlur={this.endEdit}
											/>
										) : (
											<div className="quote-content"
													 onDoubleClick={() => this.quoteDoubleClickHandler(quote.id, "content")}>
												{quote.content}
											</div>
										)
									}

									{
										editAuthor ? (
											<input
												autoFocus
												type="text"
												value={quote.author}
												onChange={(e) => this.inputChangeHandler(e, quote)}
												onKeyUp={this.endEditHandler}
												onBlur={this.endEdit}
											/>
										) : (
											<div className="quote-author"
													 onDoubleClick={() => this.quoteDoubleClickHandler(quote.id, "author")}
											>
												- {quote.author}
											</div>
										)
									}
								</div>
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
	editQuote: PropTypes.func
};

const mapStateToProps = (state) => ({
	quotes: state.quotes
});

const mapDispatchToProps = (dispatch) => ({
	...bindActionCreators({ saveQuote, fetchQuote, editQuote }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);
