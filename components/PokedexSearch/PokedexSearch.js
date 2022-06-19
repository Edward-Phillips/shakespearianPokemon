import React, {useState}from "react";
import PokeSearch from "../PokeSearch/PokeSearch";
import PokemonDisplay from "../PokemonDisplay/PokemonDisplay";
import styles from './PokedexSearch.module.css';

export default function Pokedex() {
  const [pokemonCache, setPokemonCache] = useState({});
  const [currentPokemonInformation, setCurrentPokemonInformation] =
    useState({ name: "", sprite: "", description: "" });

  const handleSelectedPokemonChange = (selectedPokemon) => {
    if (selectedPokemon) {
      const pokemonName = selectedPokemon.value;
      if (pokemonCache[pokemonName]) {
        setCurrentPokemonInformation(pokemonCache[pokemonName]);
      } else {
        try {

          fetch(process.env.POKEAPI_ADDRESS + pokemonName)
          .then((response) => response.json())
          .then((data) => {
            setCurrentPokemonInformation({
              name: selectedPokemon.label,
              sprite: data.sprite,
              description: data.description,
            });
            setPokemonCache({
              ...pokemonCache,
              [pokemonName]: {
                name: data.name,
                sprite: data.sprite,
                description: data.description,
              },
            });
          });
        } catch (error) {
          console.log(error);
        }
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
