const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 4000;
const dataPath = path.resolve(__dirname, "../Backend/utils/data.json"); // Path to the data file

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

function readData() {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    const imagePath = path.join(__dirname, "assets", "image1.jpeg"); // Adjust path as needed
    const movieList = JSON.parse(data).map((movie) => {
      return { ...movie, img: path.resolve(imagePath) };
    });
    return movieList;
  } catch (err) {
    console.error("Error reading data file:", err);
    return [];
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing data to file:", err);
  }
}

app.get("/data", (req, res) => {
  try {
    const movies = readData();
    res.json(movies);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.post("/data", (req, res) => {
  try {
    const movies = readData();
    const newMovie = req.body;

    if (!newMovie.title || !newMovie.description) {
      return res
        .status(400)
        .json({ error: "Missing required fields (Title and Description)" });
    }

    newMovie.id = uuidv4();
    movies.push(newMovie);

    writeData(movies);

    res.status(201).json(newMovie);
  } catch (err) {
    console.error("Error adding movie:", err);
    res.status(500).json({ error: "Failed to add movie" });
  }
});

app.delete("/data/:id", (req, res) => {
  const { id } = req.params;
  console.log(id, "id");
  try {
    const movies = readData();
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    console.log(id, movieIndex, "params");
    if (movieIndex === -1) {
      return res.status(404).json({ error: "Movie not found" });
    }

    movies.splice(movieIndex, 1);
    writeData(movies);

    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.error("Error deleting movie:", err);
    res.status(500).json({ error: "Failed to delete movie" });
  }
});

app.put("/data/:id", (req, res) => {
  try {
    const movies = readData();
    const { id } = req.params;
    const updatedMovie = req.body;
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
      return res.status(404).json({ error: "Movie not found" });
    }
    if (!updatedMovie.title || !updatedMovie.description) {
      return res
        .status(400)
        .json({ error: "Missing required fields (Title and Description)" });
    }
    movies[movieIndex] = { ...movies[movieIndex], ...updatedMovie };
    console.log(movieIndex, movies)
    writeData(movies);
    res.status(200).json(movies[movieIndex]);
  } catch (err) {
    console.error("Error updating movie:", err);
    res.status(500).json({ error: "Failed to update movie" });
  }
});

app.options("*", cors()); // Respond to all OPTIONS requests with CORS headers

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
