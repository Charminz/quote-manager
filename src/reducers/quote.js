import { SAVE_QUOTE, GET_QUOTES } from "../actions";

export default (state = [], action) => {
	const payload = action.payload;

	switch (action.type) {
		case SAVE_QUOTE:
			state.quotes = [ ...state.quotes, payload ];
			break;
		case GET_QUOTES:
			return state.quotes;
		default:
			return state;
	}
}