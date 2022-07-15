import React, { useEffect, useState } from "react";
import { GridRow } from "./GridRow/GridRow";
import availablePokemon from "../PokeSearch/availablePokemon";
import HiddenPokemonDisplay from "./HiddenPokemonDisplay/HiddenPokemonDisplay";
import Pokedex from "../Pokedex/Pokedex";
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
    setIsCorrect(false);
    setModalOpen(false);
    setSubmitCount(0);
  }

  useEffect(() => {
    if (reset) {
      const newPokemon = availablePokemon[Math.floor(Math.random() * availablePokemon.length)];
      try {
        fetch(process.env.POKEAPI_ADDRESS + newPokemon.value)
        .then((response) => response.json())
        .then((data) => {
          console.log({data});
          setThatPokemon({
            name: data.name ?? 'bulbasaur',
            sprite: data.sprite ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            description: data.description ?? 'These pokemon are small, squat amphibian and plant Pokémon that move on all four legs, and have blue-green bodies with darker blue-green spots.',
          });
          setReset(false);
        })} catch (error) {
          console.log(error);
          setThatPokemon({sprite: 'something'});
        }
      }
  }, [reset]);


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
    <Pokedex navbar={{title: 'go to pokedex', href:'/'}}>
    <section style={{display: 'grid', gridTemplateRows: '1fr 0.1fr 1fr', placeItems: 'center'}}>
      <HiddenPokemonDisplay
        pokemonInfo={thatPokemon}
        loading={!(thatPokemon.name ?? false)}
        reveal={isCorrect}
        setReset={setReset}
      />
      <div onClick={handlePlayAgain}>reset</div>
      <GridRow
        guesses={guesses}
        word={thatPokemon.name ?? "loading"}
        setIsCorrect={setIsCorrect}
        isCorrect={isCorrect}
        incrementSubmitCount={() => setSubmitCount(submitCount + 1)}
        reset={reset}
      />
    </section>
      <ReactModal isOpen={modalOpen}><ScoreModal closeModal={() => setModalOpen(false)} wins={winCount} lost={submitCount === guesses} playAgain={handlePlayAgain} /></ReactModal>
    </Pokedex>
  );
}
