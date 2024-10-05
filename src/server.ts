import express from 'express';
import cors from 'cors';
import { movies } from './data';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Get all movies
app.get('/api/movies', (req, res) => {
    res.json(movies);
});

// Get movie by id
app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: "Movie not found" });
    }
});

// Get movies by category
app.get('/api/categories/:category', (req, res) => {
    const categoryMovies = movies.filter(m => m.category.toLowerCase() === req.params.category.toLowerCase());
    res.json(categoryMovies);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});