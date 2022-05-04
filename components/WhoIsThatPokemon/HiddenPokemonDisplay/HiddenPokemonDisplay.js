import React from "react";
import styles from './HiddenPokemonDisplay.module.css';
export default function HiddenPokemonDisplay({pokemonInfo, reveal}) {
  return (
    <section className={styles.outerContainer}>
    <article className={styles.pokemonDisplayContainer}>
      <figure className={styles.pokemonDisplayFigure}>
        <img className={`${styles.pokemonDisplayImage} ${!reveal && styles.obscured}`} src={pokemonInfo?.sprite} alt={reveal?pokemonInfo.name : 'a hidden pokemon. what could it be?'} />
        {reveal && <figcaption className={styles.pokemonDisplayCaption}>{pokemonInfo?.name}</figcaption>}
      </figure>
    </article>
      <p className={styles.pokemonDisplayDescription}>{pokemonInfo?.description?.replace(new RegExp(`[${pokemonInfo?.name?.[0]?.toLowerCase()},${pokemonInfo?.name?.[0]?.toUpperCase()}]${pokemonInfo?.name?.slice(1, pokemonInfo?.name?.length)}`),"this Pokemon")}</p>
    </section>
  );
}