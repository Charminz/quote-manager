import QuoteAPI from "../api";

export const SAVE_QUOTE = "SAVE_QUOTE";
export const UPDATE_QUOTE = "UPDATE_QUOTE";
export const REMOVE_QUOTE = "REMOVE_QUOTE";
export const SET_LOADING = "SET_LOADING";

export const saveQuote = (quote) => ({
	type: SAVE_QUOTE,
	payload: quote
});

export const fetchQuote = () => {
	return (dispatch) => {
		dispatch({
			type: SET_LOADING,
			payload: true
		});
		return QuoteAPI.get("/posts", {
			params: {
				"filter[orderby]": "rand",
				"filter[posts_per_page]": 1,
				"timestamp": new Date().getTime()
			}
		}).then(response => {
				dispatch({
					type: SET_LOADING,
					payload: false
				});
				return response.status === 200 ? response.data[0] : {};
			}
		);
	};
};

export const updateQuote = (quote) => ({
	type: UPDATE_QUOTE,
	payload: quote
});

export const removeQuote = (id) => ({
	type: REMOVE_QUOTE,
	payload: id
});
