import {
  ADD_MOVIE_FAILURE,
  ADD_MOVIE_SUCCESS,
  DELETE_MOVIE,
  EDIT_MOVIE_FAILURE,
  EDIT_MOVIE_SUCCESS,
  MOVIES,
} from "./movieActions";

const initialState = {
  movies: [],
  error: null,
  id: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIES:
      return {
        ...state,
        movies: [...state.movies, ...action.payload],
        error: null,
      };
    case ADD_MOVIE_SUCCESS:
      return {
        ...state,
        movies: [...state.movies, action.payload],
        error: null,
      };
    case ADD_MOVIE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case EDIT_MOVIE_SUCCESS:
      const movieIndex = state.movies.findIndex(
        (movie) => movie.id === action.payload.id
      );
      state.movies[movieIndex] = {
        ...state.movies[movieIndex],
        ...action.payload,
      };
      return {
        ...state,
        movies: state.movies,
        error: null,
      };
    case EDIT_MOVIE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
        error: null,
      };
    default:
      return state;
  }
};

export default movieReducer;
