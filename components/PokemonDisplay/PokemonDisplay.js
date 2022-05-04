import React, { useEffect } from "react";

export default function PokemonDisplay({pokemonInfo}) {
  return (
    <article>
      <figure>
        <img src={pokemonInfo.image} alt={pokemonInfo.name} />
        <figcaption>{pokemonInfo.name}</figcaption>
      </figure>
      <p>{pokemonInfo.description}</p>
    </article>
  );
}
