

import React, { useEffect, useState } from "react";
import { useFavoriteMovies } from "../utilities/FavoriteMoviesContext";
import Section from "./Section";



const FavoriteMovies = () => {
  const { favoriteMovies } = useFavoriteMovies();

  return (
   <Section className="pt-[12rem] -mt-[3.25rem] " customPaddings>
     <div className="flex flex-col justify-center items-center container mt-12">
      <h2 className="h2 mb-10">Meus filmes favoritos 😍:</h2>
      <ul className="space-y-4  mx-auto text-center w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/2 ">
          {favoriteMovies.length > 0 ? (
            favoriteMovies.map((movie) => (
              
              <li className="mb-2 p-4 rounded-lg relative">
                <div
                  className="absolute inset-0"
                  style={{
                    borderRadius: "5px",
                    padding: "2px",
                    background:
                      "linear-gradient(225deg, #FFC876, #79FFF7, #9F53FF, #FF98E2, #FFC876)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    position: "absolute",
                    content: '""',
                    inset: 0,
                  }}
                />
                {movie.title} 
              </li>
            ))
          ) : (
            <p>Nenhum filme foi adicionado aqui ainda.</p>
          )}
        </ul>
    </div>
   </Section>
  );
};

export default FavoriteMovies;
