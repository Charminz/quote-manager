import QuoteAPI from "../api";

export const SAVE_QUOTE = "SAVE_QUOTE";
export const GET_QUOTES = "GET_QUOTES";

export const saveQuote = (quote, author) => ({
	type: SAVE_QUOTE,
	payload: {
		quote, author
	}
});

export const fetchQuote = () => {
	return () => {
		return QuoteAPI.get().then(response =>
			(response.status === 200 ? response.data[ 0 ] : {})
		);
	};
};

export const getQuotes = () => ({
	type: GET_QUOTES
});