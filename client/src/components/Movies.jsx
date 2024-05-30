import React, { useEffect, useState } from "react";
import { getMovie } from "../services/api";
import { useParams } from "react-router-dom";
import Section from "./Section";

const Movies = () => {
  const { mood } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [history, setHistory] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [nextPressed, setNextPressed] = useState(false); 

  const fetchMovies = async (newMood) => {
    setLoading(true);
    setError(null);
    try {
      const moviesData = await getMovie(newMood || mood);
      setMovies(moviesData);

      const newHistory = [...history];
      if (currentIndex < newHistory.length - 1) {
        newHistory.splice(currentIndex + 1); 
      }
      newHistory.push(moviesData);
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    } catch (error) {
      setError("Erro ao buscar filmes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [mood]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Carregando...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );

  const goBack = () => {
    if (nextPressed && currentIndex > 0) { // Check if "Próximo" was pressed
      setCurrentIndex(currentIndex - 1);
      setMovies(history[currentIndex - 1]);
    }
  };

  const goNext = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setMovies(history[currentIndex + 1]);
    } else {
      fetchMovies();
    }
    setNextPressed(true); // Set the state to indicate "Próximo" was pressed
  };

  return (
    <Section>
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="container mx-auto p-4 shadow-xl rounded-lg w-full sm:w-3/4  md:w-1/2 "
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <ul className="space-y-4">
            {movies.map((movie) => (
              <li
                key={movie.id}
                className="text-gray-900 shadow-md rounded-lg p-4"
              >
                <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                <p className="text-gray-700 mb-2">{movie.overview}</p>
                <p className="text mb-1">
                  <strong>Genêro:</strong> {movie.genre}
                </p>
                <p className="text">
                  <strong>Avaliação:</strong> {movie.vote_average.toFixed()}
                </p>
              </li>
            ))}
          </ul>

          <div className="card-actions flex justify-center mt-4 space-x-4">
            <button
              className="btn btn-primary btn-sm md:btn-md nunito text-black"
              onClick={goBack}
              disabled={!nextPressed || currentIndex <= 0} // Disable if "Próximo" wasn't pressed
            >
              <span className="mr-1">⬅️</span> Voltar
            </button>
            <button className="btn btn-primary btn-sm md:btn-md nunito text-black">
              <span className="mr-1">🙈</span> Esconder
            </button>
            <button
              className="btn btn-primary btn-sm md:btn-md nunito text-black"
              onClick={goNext}
            >
              Próximo <span className="ml-1">➡️</span>
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Movies;
