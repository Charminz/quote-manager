import React from "react";

const QuoteBlock = (props) => (
	<div className="quote-block">
		{props.quote ? (
			<div>
				{props.quote.author} - {props.quote.content}
			</div>
		) : (
			<div> Grab some quotes below to start adding them to your library! </div>
		)}
	</div>
);

export default QuoteBlock;