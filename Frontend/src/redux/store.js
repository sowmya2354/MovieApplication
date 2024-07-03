import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './combineReducer'; // Adjust the path as needed

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
