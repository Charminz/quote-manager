import QuoteAPI from "../api";

export const SAVE_QUOTE = "SAVE_QUOTE";
export const EDIT_QUOTE = "EDIT_QUOTE";

export const saveQuote = (quote) => ({
	type: SAVE_QUOTE,
	payload: quote
});

export const fetchQuote = () => {
	return () => {
		return QuoteAPI.get("/posts", {
			params: {
				"filter[orderby]": "rand",
				"filter[posts_per_page]": 1,
				"timestamp": new Date().getTime()
			}
		}).then(response =>
			(response.status === 200 ? response.data[ 0 ] : {})
		);
	};
};

export const editQuote = (quote) => ({
	type: EDIT_QUOTE,
	payload: quote
})
