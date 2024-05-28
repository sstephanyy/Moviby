import React, { useEffect, useState } from "react";
import { getMovie } from "../services/api";

const Movies = ({ mood }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (mood) {
        try {
          const moviesData = await getMovie(mood);
          console.log(moviesData);
          setMovies(moviesData);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      }
    };

    fetchMovies();
  }, [mood]);

  return (
    <div style={{padding: "128px"}}>
      <ul>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.genre}</p>
          </div>
        ))}
      </ul>
      <h2></h2>
    </div>
  );
};

export default Movies;
