import React from "react";

const QuoteBlock = (props) => (
	<div className="quote-block">
		{props.quote ? (
			<div>
				{props.quote.author} -
				<div dangerouslySetInnerHTML={{__html: props.quote.content}}/>
			</div>
		) : (
			<div> No quote found </div>
		)}
	</div>
);

export default QuoteBlock;