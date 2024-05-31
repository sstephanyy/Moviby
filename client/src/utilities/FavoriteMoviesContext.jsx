import React, { createContext, useReducer, useContext, useEffect } from 'react';

const FavoriteMoviesContext = createContext();

const favoriteMoviesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      const updatedStateAdd = [...state, action.movie];
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedStateAdd));
      return updatedStateAdd;
    case 'REMOVE_FAVORITE':
      const updatedStateRemove = state.filter(movie => movie.id !== action.id);
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedStateRemove));
      return updatedStateRemove;
    default:
      return state;
  }
};

export const FavoriteMoviesProvider = ({ children }) => {
  const [favoriteMovies, dispatch] = useReducer(favoriteMoviesReducer, [], () => {
    const localData = localStorage.getItem('favoriteMovies');
    return localData ? JSON.parse(localData) : [];
  });

  return (
    <FavoriteMoviesContext.Provider value={{ favoriteMovies, dispatch }}>
      {children}
    </FavoriteMoviesContext.Provider>
  );
};

export const useFavoriteMovies = () => useContext(FavoriteMoviesContext);
