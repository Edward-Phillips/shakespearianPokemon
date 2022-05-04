import React from 'react';
import Select from 'react-select'
import availablePokemon from './availablePokemon';
import styles from "./pokesearch.module.css";

export default function PokeSearch({onSelectedPokemonChange}) {
  return (
    <Select className={styles.pokeSearch}aria-label='search' onChange={onSelectedPokemonChange} options={availablePokemon}></Select>
  );
}