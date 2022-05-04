import React, { useEffect, useState } from "react";
import { GridRow } from "./GridRow/GridRow";
import availablePokemon from "../PokeSearch/availablePokemon";
import HiddenPokemonDisplay from "./HiddenPokemonDisplay/HiddenPokemonDisplay";

export default function WhoIsThatPokemon() {
  const [thatPokemon, setThatPokemon] = useState(
    availablePokemon[Math.floor(Math.random() * availablePokemon.length)]
  );

  useEffect(() => {
    if(thatPokemon.sprite) {
      return;
    }
    try {

      fetch(process.env.POKEAPI_ADDRESS + thatPokemon.value)
      .then((response) => response.json())
      .then((data) => {
        setThatPokemon({
          name: data.name,
          sprite: data.sprite,
          description: data.description,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [thatPokemon]);
  return <div>
  <HiddenPokemonDisplay pokemonInfo={thatPokemon} reveal={false} />
  <GridRow guesses={6} word={thatPokemon.name ?? "loading"} />;
  </div>
}
