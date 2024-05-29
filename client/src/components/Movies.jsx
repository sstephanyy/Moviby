import React, { useEffect, useState } from "react";
import { getMovie } from "../services/api";
import { useParams } from "react-router-dom";

const Movies = () => {
  const { mood } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const moviesData = await getMovie(mood);
        setMovies(moviesData);
      } catch (error) {
        setError('Error fetching movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [mood]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">{error}</div>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Movies for mood: {mood}</h1>
      <ul className="text-center">
        {movies.map((movie) => (
          <li key={movie.id} className="bg-white text-gray-900 shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
            <p className="text-gray-700 mb-2">{movie.overview}</p>
            <p className="text-gray-600 mb-1"><strong>Genre:</strong> {movie.genre}</p>
            <p className="text-gray-600"><strong>Rating:</strong> {movie.vote_average}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;