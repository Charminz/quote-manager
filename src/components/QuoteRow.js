import React from "react";

const QuoteRow = ({ quote, editContent, editAuthor, quoteInEdit, onChangeHandler, onKeyUpHandler, onBlurHandler, beginEditHandler }) => (
	<div key={quote.id}>
		{
			editContent ? (
				<textarea
					className="quote-edit input-field"
					autoFocus
					value={quoteInEdit.content}
					onChange={onChangeHandler}
					onKeyUp={onKeyUpHandler}
					onBlur={onBlurHandler}
				/>
			) : (
				<div className="quote-content"
						 onDoubleClick={() => beginEditHandler(quote, "content")}>
					{quote.content}
				</div>
			)
		}

		{
			editAuthor ? (
				<input
					autoFocus
					className="input-field"
					type="text"
					value={quoteInEdit.author}
					onChange={onChangeHandler}
					onKeyUp={onKeyUpHandler}
					onBlur={onBlurHandler}
				/>
			) : (
				<div className="quote-author"
						 onDoubleClick={() => beginEditHandler(quote, "author")}
				>
					{quote.author}
				</div>
			)
		}
	</div>
);

export default QuoteRow;