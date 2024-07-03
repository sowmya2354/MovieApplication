// src/redux/reducers/combineReducer.js
import { combineReducers } from 'redux';
import movieReducer from './movieReducer'; // Adjust the path as needed

const rootReducer = combineReducers({
  movies: movieReducer,
});

export default rootReducer;
