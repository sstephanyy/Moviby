import { useFavoriteMovies } from "../utilities/FavoriteMoviesContext";
import Section from "./Section";
import { MovieSection } from "./MovieSection";

const FavoriteMovies = () => {
  const { favoriteMovies } = useFavoriteMovies();

  const filmesParaAssistir = favoriteMovies.filter(movie => movie.category === "toWatch");
  const filmesAssistidos = favoriteMovies.filter(movie => movie.category === "watched");
  const filmesFavoritos = favoriteMovies.filter(movie => movie.category === "favorite");
  const filmesOdiados = favoriteMovies.filter(movie => movie.category === "hated");

  return (
    <Section className="pt-[12rem] -mt-[3.25rem]" customPaddings>
    <div className="container mx-auto mt-12">
      <h2 className="h2 mb-10 text-center">Meus filmes 🤩:</h2>
      <div className=" flex justify-center gap-4">
        <MovieSection title="Minha lista de filmes 😊" movies={filmesParaAssistir} className="w-full md:w-1/2 lg:w-1/4" />
        <MovieSection title="Filmes assistidos 😄" movies={filmesAssistidos} className="w-full md:w-1/2 lg:w-1/4" />
        <MovieSection title="Filmes favoritos 😍" movies={filmesFavoritos} className="w-full md:w-1/2 lg:w-1/4" />
        <MovieSection title="Filmes odiados 🤬" movies={filmesOdiados} className="w-full md:w-1/2 lg:w-1/4" />
      </div>
  </div>
</Section>

  );
};

export default FavoriteMovies;
