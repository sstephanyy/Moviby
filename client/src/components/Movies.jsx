// src/components/Movies.jsx
import React, { useEffect, useState } from "react";
import { getMovie } from "../services/api";
import { useParams } from "react-router-dom";
import { useFavoriteMovies } from "../utilities/FavoriteMoviesContext";
import Section from "./Section";
import bookmark from "../assets/bookmark.png";

const Movies = () => {
  const { mood } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [nextPressed, setNextPressed] = useState(false);

  const { favoriteMovies, dispatch } = useFavoriteMovies();

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

  const handleBookmark = (movieId) => {
    const movie = movies.find((m) => m.id === movieId);
    if (movie) {
      if (favoriteMovies.some((favMovie) => favMovie.id === movieId)) {
        dispatch({ type: 'REMOVE_FAVORITE', id: movieId });
      } else {
        dispatch({ type: 'ADD_FAVORITE', movie });
      }
    }
  };



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
    if (nextPressed && currentIndex > 0) {
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
    setNextPressed(true);
  };

  return (
    <Section className="">
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="container mx-auto p-4 shadow-xl rounded-lg w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 "
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <ul className="space-y-4">
            {movies.length > 0 &&
              movies.map((movie) => (
                <li
                  key={movie.id}
                  className="text-gray-900 shadow-md rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-3">
                      {movie.title}
                    </h2>
                    <button
                      className="flex items-center justify-between"
                      onClick={() => handleBookmark(movie.id)}
                    >
                       <span className="text-sm">
                        {favoriteMovies.some((favMovie) => favMovie.id === movie.id) ? "Remover" : "Salvar"}
                      </span>
                      <img
                        src={bookmark}
                        alt="salvar filme"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                  <p className="text-gray-700 mb-2">{movie.overview}</p>
                  <p className="text mb-1">
                    <strong>Genêro:</strong> {movie.genre}
                  </p>
                  <p className="text">
                    <strong>Avaliação:</strong> {movie.vote_average.toFixed()}⭐
                  </p>
                </li>
              ))}
          </ul>
          <div className="card-actions flex justify-center mt-4 space-x-4">
            <button
              className="btn btn-primary btn-sm md:btn-md nunito text-black"
              onClick={goBack}
              disabled={!nextPressed || currentIndex <= 0}
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
