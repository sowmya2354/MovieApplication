import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Rating from '@mui/material/Rating';
import React from "react";
export default function MovieCard({
  title,
  year,
  description,
  genre,
  handleDelete,
  handleEdit,
  id,
  watched,
  handleWatched,
  handleRating,
  rating
}) {
  console.log(rating);
  return (
    <div>
      <Card style={{ width: "100%", minHeight: "100%" }}>
        <Box>
          <Box className="overlay">
            <Typography variant="h5" component="div" className="overlayText">
              {title}
            </Typography>
          </Box>
        </Box>
        <CardContent className="cardContentStyle">
          <Typography variant="h7" color="text.primary">
            Release Year:{year}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Description: {description}
          </Typography>
          <Typography variant="body2" color="text.primary" style={{ marginBottom: "2opx" }}>
            Genre: {genre}
          </Typography>
          <Button
            variant="contained"
            onClick={handleDelete}
            id={id}
            style={{ marginRight: "10px" }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={handleEdit}
            id={id}
            style={{ marginRight: "25%" }}
          >
            Edit
          </Button>
          {!watched ?
            <Button
              variant="contained"
              onClick={handleWatched}
              id={id}>
              Mark As Watched
            </Button> : <Rating onChange={handleRating } name={id} value={Number(rating)}/>}
        </CardContent>
      </Card>
    </div>
  );
}
