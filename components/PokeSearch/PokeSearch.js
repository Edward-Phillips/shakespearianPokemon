import React, { useState } from "react";
import availablePokemon from "./availablePokemon";
import styles from "./pokesearch.module.css";

export default function PokeSearch({ onSelectedPokemonChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const filteredResults = availablePokemon.filter((pokemon) => {
      return pokemon.value.includes(searchTerm);
    });

    setSearchResults(filteredResults);
  };

  return (
    <>
      <div>
        <input
          type="textarea"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul className={styles.resultsList}>
        {searchResults.map((result) => {
          return (
            <li onClick={() => onSelectedPokemonChange(result)}>
              {result.value}
            </li>
          );
        })}
      </ul>
    </>
  );
}
