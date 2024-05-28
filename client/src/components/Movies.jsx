import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../services/api';

const Movies = () => {
  const { genre } = useParams(); // Fetch genre from URL params
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch movies based on mood when component mounts
    const fetchMovies = async () => {
      try {
        const response = await getMovie(genre); // Call API to fetch movies
        setMovies(response); // Assuming the response contains movie data
      } catch (error) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genre]); // Fetch movies whenever genre changes

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Movies in {genre} genre</h2>
      <div className="movie-list">
        {movies.map(movie => (
          <div key={movie.id} className="movie">
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            {/* Add more movie details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
