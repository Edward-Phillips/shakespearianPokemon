import React from "react";
import {Grid} from "../Grid/Grid";
import styles from './gridRow.module.css';

export function GridRow({guesses, word, setIsCorrect, isCorrect, incrementSubmitCount, reset}) {
  return (
    <div className={styles.guessesGrid} styles={{gridTemplateRows:`repeat(${guesses}, 1fr)`}}>
      {Array(guesses)
        .fill(0)
        .map((_, index) => {
          return <Grid word={word} key={`gridrow${index}`} row={index} setIsCorrect={setIsCorrect} isCorrect={isCorrect} incrementSubmitCount={incrementSubmitCount} reset={reset} />;
        })}
    </div>
  );
}
