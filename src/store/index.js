import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from '../reducers/quote';

const initialState = {
	quotes: [],
	loading: false
};

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
);
store.subscribe(() => console.log(store.getState()));

export default store;