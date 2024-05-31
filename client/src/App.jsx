import { BrowserRouter, Route, Routes } from "react-router-dom";

import ButtonGradient from "./assets/ButtonGradient";
import Header from "./components/Header";
import { Main } from "./components/Main";
import Movies from "./components/Movies";
import Login from "./components/Login";
import Register from "./components/Register";
import FavoriteMovies from "./components/FavoriteMovies";
import { FavoriteMoviesProvider } from "./utilities/FavoriteMoviesContext.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <FavoriteMoviesProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Register />} />
          <Route path="/" element={<Main />} />

          <Route
            path="/movies/:mood"
            element={
              <FavoriteMoviesProvider>
                <Movies />
              </FavoriteMoviesProvider>
            }
          />
          <Route
            path="/meus-filmes"
            element={
              <FavoriteMoviesProvider>
                <FavoriteMovies />
              </FavoriteMoviesProvider>
            }
          />
        </Routes>
        <ButtonGradient />
      </FavoriteMoviesProvider>
    </BrowserRouter>
  );
};

export default App;
