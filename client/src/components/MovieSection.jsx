import React from "react";
import { MovieCard } from "./MovieCard";

export const MovieSection = ({ title, movies, onDropInMovieSection, onDragStartMovie }) => {
  const handleDragStart = (id) => {
    onDragStartMovie(id);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    onDropInMovieSection(title);  
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div 
      className="mb-8 w-full rounded-lg shadow-md border bg-n-8/90 p-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h3 className="text-lg font-semibold mb-6 text-white">{title}</h3>
      <div className="gap-6">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <MovieCard
              key={index}
              id={movie.id}
              title={movie.title}
              tags={movie.tags || []}
              onDragStart={handleDragStart}
            />
          ))
        ) : (
          <p className="w-full text-center text-white p-2 bg-indigo-500 rounded-md">
            Nenhum filme foi adicionado aqui ainda.
          </p>
        )}
      </div>
    </div>
  );
};
