import { SAVE_QUOTE, EDIT_QUOTE } from "../actions";

export default (state = [], { type, payload }) => {

	switch (type) {
		case SAVE_QUOTE:
			return {
				...state,
				quotes: [ ...state.quotes, payload ]
			};
		case EDIT_QUOTE:
			const copyState = state;
			const index = copyState.quotes.findIndex(quote => quote.id === payload.id);
			copyState.quotes.splice(index, 1, payload);
			return copyState
		default:
			return state;
	}
}