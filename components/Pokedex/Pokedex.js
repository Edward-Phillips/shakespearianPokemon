import React, {useState}from "react";
import PokeSearch from "../PokeSearch/PokeSearch";
import PokemonDisplay from "../PokemonDisplay/PokemonDisplay";
import styles from './Pokedex.module.css';

export default function Pokedex() {
  const [pokemonCache, setPokemonCache] = useState({});
  const [currentPokemonInformation, setCurrentPokemonInformation] =
    useState({ name: "", image: "", description: "" });

  const handleSelectedPokemonChange = (selectedPokemon) => {
    if (selectedPokemon) {
      const pokemonName = selectedPokemon.value;
      if (pokemonCache[pokemonName]) {
        setCurrentPokemonInformation(pokemonCache[pokemonName]);
      } else {
        fetch(process.env.POKEAPI_ADDRESS + pokemonName)
          .then((response) => response.json())
          .then((data) => {
            setCurrentPokemonInformation({
              name: data.name,
              image: data.image,
              description: data.description,
            });
            setPokemonCache({
              ...pokemonCache,
              [pokemonName]: {
                name: data.name,
                image: data.image,
                description: data.description,
              },
            });
          });
      }
    }
  };
  return (
    <div className={styles.pokedexContainer}>
      <PokeSearch onSelectedPokemonChange={handleSelectedPokemonChange} />
      <PokemonDisplay pokemonInfo={currentPokemonInformation} />
    </div>
  );
}
