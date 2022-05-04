import React, { useEffect, useState } from "react";
import { GridRow } from "./GridRow/GridRow";
import availablePokemon from "../PokeSearch/availablePokemon";
import HiddenPokemonDisplay from "./HiddenPokemonDisplay/HiddenPokemonDisplay";
import styles from './WhoIsThatPokemon.module.css';
import ReactModal from 'react-modal';
import ScoreModal from "./ScoreModal/ScoreModal";

export default function WhoIsThatPokemon() {
  const [thatPokemon, setThatPokemon] = useState(
    availablePokemon[Math.floor(Math.random() * availablePokemon.length)]
  );

  const [isCorrect, setIsCorrect] = useState(false)
  const [winCount, setWinCount] = useState(0);
  const [submitCount, setSubmitCount] = useState(0);
  const [guesses, setGuesses] = useState(6);
  const [reset, setReset] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    ReactModal.setAppElement('body')
  }, [])

  const handlePlayAgain = () => {
    setReset(true);
    setThatPokemon(availablePokemon[Math.floor(Math.random() * availablePokemon.length)]);
    setIsCorrect(false);
    setModalOpen(false);
    setSubmitCount(0);
  }

  useEffect(() => {
    if (thatPokemon.sprite && !reset) {
      return;
    }
    try {
      fetch(process.env.POKEAPI_ADDRESS + thatPokemon.value)
        .then((response) => response.json())
        .then((data) => {
          setThatPokemon({
            name: thatPokemon.label,
            sprite: data.sprite,
            description: data.description,
          });
        });
      setReset(false);
    } catch (error) {
      console.log(error);
    }
  }, [thatPokemon, reset]);

  useEffect(() => {
    if (isCorrect) {
     setWinCount(winCount + 1);
     setModalOpen(true);
     setIsCorrect(false)
    }
  }, [isCorrect]);

  useEffect(() => {
    if(submitCount === guesses) {
      setModalOpen(true);
      setWinCount(0);
    }
  }, [submitCount]);
  return (
    <div className={styles.container}>
      <HiddenPokemonDisplay
        pokemonInfo={thatPokemon}
        loading={!(thatPokemon.name ?? false)}
        reveal={isCorrect}
        setReset={setReset}
      />
      <GridRow
        guesses={guesses}
        word={thatPokemon.name ?? "loading"}
        setIsCorrect={setIsCorrect}
        isCorrect={isCorrect}
        incrementSubmitCount={() => setSubmitCount(submitCount + 1)}
        reset={reset}
      />
      <ReactModal isOpen={modalOpen}><ScoreModal closeModal={() => setModalOpen(false)} wins={winCount} lost={submitCount === guesses} playAgain={handlePlayAgain} /></ReactModal>
    </div>
  );
}
