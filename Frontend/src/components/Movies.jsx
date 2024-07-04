import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { deleteMovie, getMovies, putMovie } from "../redux/movieSlice";
import "../styles.css";
import AddMovieComponent from "./AddMovie";
import MovieCard from "./MovieCard";

const Home = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);
  const [editMovie, setEditMovie] = useState({ id: "", edit: false });

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  const handleDelete = (e) => {
    dispatch(deleteMovie(e.target.id)); // Wait for deletion
  };

  const handleEdit = (e) => {
    setEditMovie({ id: e.target.id, edit: true });
  };

  const handleWatched = (e) => {
    const watchedMovies = movies.filter((item) => item.id === e.target.id);
    dispatch(putMovie({ ...watchedMovies[0], watched: true }, e.target.id));
  };
  const handleRating=(e)=>{
    const watchedMovies = movies.filter((item) => item.id === e.target.name);
    console.log(e);
    dispatch(putMovie({ ...watchedMovies[0], rating:e.target.value }, e.target.name));
  }

  return (
    <div>
      <div className="add_movie_wrapper">
        <AddMovieComponent editMovie={editMovie} setEditMovie={setEditMovie} />
      </div>
      <h1>Unwatched Movies</h1>
      <Grid container spacing={2}>
        {movies?.map((movie) => (
          <>
            {!movie.hasOwnProperty("watched") && !movie.watched && (
              <>
                <Grid item xs={12} sm={6} md={4} key={movie.id}>
                  <MovieCard
                    id={movie.id}
                    title={movie.title}
                    description={movie.description}
                    year={movie.year}
                    genre={movie.genre}
                    watched={false}
                    handleEdit={(e) => handleEdit(e)}
                    handleDelete={(e) => handleDelete(e)}
                    handleWatched={(e) => handleWatched(e)}
                  />
                </Grid>
              </>
            )}
          </>
        ))}
      </Grid>

      <h1>Watched Movies</h1>
      <Grid container spacing={2}>
        {movies?.map((movie) => (
          <>
            {movie.hasOwnProperty("watched") && movie.watched && (
              <>
                <Grid item xs={12} sm={6} md={4} key={movie.id}>
                  <MovieCard
                    id={movie.id}
                    title={movie.title}
                    description={movie.description}
                    year={movie.year}
                    genre={movie.genre}
                    watched={true}
                    rating ={movie.rating}
                    handleEdit={(e) => handleEdit(e)}
                    handleDelete={(e) => handleDelete(e)}
                    handleWatched={(e) => handleWatched(e)}
                    handleRating={(e)=>handleRating(e)}
                  />
                </Grid>
              </>
            )}
          </>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.movies.error,
});

const mapDispatchToProps = {
  deleteMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
