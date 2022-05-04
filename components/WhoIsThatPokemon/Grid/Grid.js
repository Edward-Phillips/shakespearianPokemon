import React, { useState, useMemo, useEffect} from "react";
import Cell from "../Cell/Cell";
import styles from "./Grid.module.css";

export function Grid({ word, row, setIsCorrect, isCorrect }) {
  const [submit, setSubmit] = useState(false);
  const [fillState, setFillState] = useState({});
  const [correctCollection, setCorrectCollection] = useState({});

  const toggleSubmit = () => !submit && checkFillState ?setSubmit(!submit): null;
  const checkFillState = useMemo( () => {
    let isFill = true;
    const values = Object.values(fillState);
    if(values.length !== word.length ) {
      return false
    }
    Object.values(fillState).forEach((element) => {
      if (element === false) {
        isFill = false;
      }
    });
    return isFill;
  }, [fillState, word]);

  useEffect(() => {
    if (Object.values(correctCollection).includes(false)) {
      return;
    }
    if (Object.keys(correctCollection).length < word.length) {
      return;
    }
    if (submit) {
      setIsCorrect(true);
    }
  }, [correctCollection, setIsCorrect, word, submit]);


  return (
    <div className={styles.gridRow} onKeyDown={toggleSubmit} style={{gridTemplateColumns: `repeat(${word.length}, minmax(20px, 250px))`}}>
        {word.split("").map((letter, index) => {
          return <Cell key={`${row}${word.length}${index}`} word={word} rowNumber={1} index={index} submit={isCorrect? isCorrect : submit} setIsCorrect={(value) =>
           {
            setCorrectCollection({...correctCollection, [index]: value})
          }} setFillState={(value) => setFillState({...fillState, [index]: value})} />;
        })}
    </div>
  );
}
