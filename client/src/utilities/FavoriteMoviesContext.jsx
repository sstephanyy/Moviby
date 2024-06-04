import React, { createContext, useReducer, useContext } from 'react';

const FavoriteMoviesContext = createContext();

const favoriteMoviesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      const updatedStateAdd = [...state, { ...action.movie, category: action.category }];
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedStateAdd));
      return updatedStateAdd;
    case 'REMOVE_FAVORITE':
      const updatedStateRemove = state.filter(movie => movie.id !== action.id);
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedStateRemove));
      return updatedStateRemove;
    case 'UPDATE_CATEGORY':
      const updatedStateUpdate = state.map(movie =>
        movie.id === action.id ? { ...movie, category: action.category } : movie
      );
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedStateUpdate));
      return updatedStateUpdate;
    default:
      return state;
  }
};

export const FavoriteMoviesProvider = ({ children }) => {
  const [favoriteMovies, dispatch] = useReducer(favoriteMoviesReducer, [], () => {
    const localData = localStorage.getItem('favoriteMovies');
    return localData ? JSON.parse(localData) : [];
  });

  const deleteMovie = (id) => {
    dispatch({ type: 'REMOVE_FAVORITE', id });
  };
  

  return (
    <FavoriteMoviesContext.Provider value={{ favoriteMovies, dispatch, deleteMovie }}>
      {children}
    </FavoriteMoviesContext.Provider>
  );
};

export const useFavoriteMovies = () => useContext(FavoriteMoviesContext);
