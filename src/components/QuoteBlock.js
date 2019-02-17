import React from "react";

const QuoteBlock = (props) => (
	props.quote ? (
		<div className="quote-block">
			<div className="quote-content">
				{props.quote.content}
			</div>
			<div className="quote-author">
				{props.quote.author}
			</div>
		</div>
	) : (
		<div className="quote-block"> Grab some quotes below to start adding them to your library! </div>
	)
);

export default QuoteBlock;