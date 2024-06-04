import React, { useState } from "react";
import trash from "../assets/trash.png";
import { useFavoriteMovies } from "../utilities/FavoriteMoviesContext";

export const MovieCard = ({ id, title, onDragStart }) => {
    const { deleteMovie } = useFavoriteMovies();

  const handleDeleteMovie = () => {
    deleteMovie(id);

  };

  const handleDragStart = () => {
    onDragStart(id);
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg cursor-grab m-4"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={() => onDragStart(null)}
    >
      <div className="w-full text-center text-white p-2 bg-indigo-500 rounded-md">
        <div className="flex justify-between items-center">
          <div className="font-bold ">{title}</div>
          <button onClick={handleDeleteMovie}>
            <img
              src={trash}
              width={24}
              height={24}
              alt="lixo"
              className="cursor-pointer"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
