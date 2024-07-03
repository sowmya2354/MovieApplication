import { Button } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { addMovie } from "../redux/movieSlice"; // Import addMovie action
import DialogBox from "./DialogBox";

const AddMovieComponent = ({ editMovie, setEditMovie }) => {
  const [open, setOpen] = useState(false);
  const { edit, ...rest } = editMovie;

  const handleClickOpen = () => {
    setOpen(true);
    setEditMovie({ edit: false, ...rest });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Movie
      </Button>
      <DialogBox open={open} setOpen={setOpen} editMovie={editMovie}  setEditMovie={setEditMovie}/>
    </div>
  );
};

const mapDispatchToProps = {
  addMovie,
};

export default connect(null, mapDispatchToProps)(AddMovieComponent);
