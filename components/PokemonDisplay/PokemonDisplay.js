import React from "react";
import styles from './PokemonDisplay.module.css';

export default function PokemonDisplay({pokemonInfo}) {

  if (!pokemonInfo.sprite) {
    return <p className={styles.pokemonDisplayDescription}>Pick a pokemon to begin!</p>;
  }
  return (
    <article className={styles.pokemonDisplayContainer}>
      <figure className={styles.pokemonDisplayFigure}>
        <img className={styles.pokemonDisplayImage} src={pokemonInfo.sprite} alt={pokemonInfo.name} />
        <figcaption className={styles.pokemonDisplayCaption}>{pokemonInfo.name}</figcaption>
      </figure>
      <p className={styles.pokemonDisplayDescription}>{pokemonInfo.description}</p>
    </article>
  );
}
