import { SAVE_QUOTE, UPDATE_QUOTE, REMOVE_QUOTE } from "../actions";

export default (state = [], { type, payload }) => {
	switch (type) {
		case SAVE_QUOTE:
			return {
				...state,
				quotes: [...state.quotes, payload]
			};
		case UPDATE_QUOTE:
			const copyState = state;
			const updateIndex = copyState.quotes.findIndex(quote => quote.id === payload.id);
			copyState.quotes.splice(updateIndex, 1, payload);
			return copyState;
		case REMOVE_QUOTE:
			return {
				...state,
				quotes: state.quotes.filter(quote => quote.id !== payload)
			};
		default:
			return state;
	}
}