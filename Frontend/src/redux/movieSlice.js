// src/redux/actions/movieActions.js
import axios from "axios";
import { ADD_MOVIE_FAILURE, ADD_MOVIE_SUCCESS, DELETE_MOVIE, EDIT_MOVIE_FAILURE, EDIT_MOVIE_SUCCESS, MOVIES } from "./movieActions"; // Adjust the path as needed

export const addMovie = (newMovie) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:4000/data", newMovie);
    dispatch({
      type: ADD_MOVIE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_MOVIE_FAILURE,
      payload: error.message,
    });
    throw error;
  }
}

export const putMovie = (formData, id) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:4000/data/${id}`, formData);
    dispatch({
      type: EDIT_MOVIE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_MOVIE_FAILURE,
      payload: error.message,
    });
    throw error;
  }
}

export const deleteMovie = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:4000/data/${id}`);
    dispatch({
      type: DELETE_MOVIE,
      payload: id,
    });
  } catch (error) {
    console.log("Error deleting movie:", error);
    throw error;
  }
};

export const getMovies = ()=> async(dispatch) =>{
  try {
    const response = await fetch("http://localhost:4000/data"); // Adjust URL if needed
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    dispatch({
      type: MOVIES,
      payload:data
    })
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

