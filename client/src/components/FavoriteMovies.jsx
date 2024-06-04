import React, { useState } from "react";
import { useFavoriteMovies } from "../utilities/FavoriteMoviesContext";
import Section from "./Section";
import { MovieSection } from "./MovieSection";

const FavoriteMovies = () => {
  const { favoriteMovies, dispatch } = useFavoriteMovies();

  const filmesParaAssistir = favoriteMovies.filter(
    (movie) => movie.category === "toWatch"
  );
  const filmesAssistidos = favoriteMovies.filter(
    (movie) => movie.category === "watched"
  );
  const filmesFavoritos = favoriteMovies.filter(
    (movie) => movie.category === "favorite"
  );
  const filmesOdiados = favoriteMovies.filter(
    (movie) => movie.category === "hated"
  );

  const [draggedMovieId, setDraggedMovieId] = useState(null);

  const handleDragStart = (movieId) => {
    setDraggedMovieId(movieId);
  };

  const handleDropInMovieSection = (sectionTitle) => {
    if (draggedMovieId) {
      const categoryMap = {
        "Minha lista de filmes 😊": "toWatch",
        "Filmes assistidos 😄": "watched",
        "Filmes favoritos 😍": "favorite",
        "Filmes odiados 🤬": "hated"
      };
      const newCategory = categoryMap[sectionTitle];
      dispatch({ type: 'UPDATE_CATEGORY', id: draggedMovieId, category: newCategory });
      setDraggedMovieId(null);
    }
  };

  return (
    <Section className="pt-[12rem] -mt-[3.25rem]" customPaddings>
      <div className="container mx-auto mt-12">
        <h2 className="h2 mb-10 text-center">Meus filmes 🤩:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <MovieSection
            title="Minha lista de filmes 😊"
            movies={filmesParaAssistir}
            onDropInMovieSection={handleDropInMovieSection}
            onDragStartMovie={handleDragStart}
          />
          <MovieSection
            title="Filmes assistidos 😄"
            movies={filmesAssistidos}
            onDropInMovieSection={handleDropInMovieSection}
            onDragStartMovie={handleDragStart}
          />
          <MovieSection
            title="Filmes favoritos 😍"
            movies={filmesFavoritos}
            onDropInMovieSection={handleDropInMovieSection}
            onDragStartMovie={handleDragStart}
          />
          <MovieSection
            title="Filmes odiados 🤬"
            movies={filmesOdiados}
            onDropInMovieSection={handleDropInMovieSection}
            onDragStartMovie={handleDragStart}
          />
        </div>
      </div>
    </Section>
  );
};

export default FavoriteMovies;
