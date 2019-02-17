import React from "react";
import Loader from "./Loader";

const NewQuote = (props) => (
	props.loading ? (
			<Loader/>
		) :
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
			<div className="quote-placeholder">
				Grab some quotes below to start adding them to your library!
			</div>
		)
);

export default NewQuote;