import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import reducer from '../reducers/quote';

const initialState = {
	quotes: []
};

const store = createStore(
	reducer,
	initialState,
	applyMiddleware(thunk)
);
store.subscribe(() => console.log(store.getState()));

export default store;