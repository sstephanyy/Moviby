import React, { useEffect, useState } from 'react';
import { getMovie } from '../services/api';


const Movies = ({ mood }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getMovie(mood);
        console.log(moviesData);
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();

    return () => {
      
    };
  }, [mood]); 

  return (
    <div>
      <h2>{mood}</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;


