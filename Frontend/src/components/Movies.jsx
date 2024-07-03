import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { deleteMovie, getMovies } from "../redux/movieSlice";
import "../styles.css";
import AddMovieComponent from "./AddMovie";

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

  return (
    <div>
      <div className="add_movie_wrapper">
        <AddMovieComponent editMovie={editMovie} setEditMovie={setEditMovie} />
      </div>
      <Grid container spacing={2}>
        {movies?.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card style={{ width: "100%", height: "100%" }}>
              <Box>
                <Box className="overlay">
                  <Typography
                    variant="h5"
                    component="div"
                    className="overlayText"
                  >
                    {movie.Title}
                  </Typography>
                </Box>
              </Box>
              <CardContent className="cardContentStyle">
                <Typography variant="h7" color="text.primary">
                  Release Year: {movie.ReleaseYear}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Description: {movie.Description}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Genre: {movie.Genre}
                </Typography>
                <Button
                  variant="contained"
                  onClick={(e) => handleDelete(e)}
                  id={movie.id}
                  style={{marginRight:'10px'}}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  onClick={(e) => handleEdit(e)}
                  id={movie.id}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
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
