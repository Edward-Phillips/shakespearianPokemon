import React, { useEffect } from "react";
import styles from "./Cell.module.css";

export default function Cell({ word, index, submit, setFillState, rowNumber, setIsCorrect }) {
  const [value, setValue] = React.useState("");
  const [isInWord, setIsInWord] = React.useState(false);
  const [isInPosition, setIsInPosition] = React.useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    setFillState(!(e.target.value === ""));
    focusNextInput(e.target);
  };

  const focusNextInput = (target) => {
    if (!(target.value === "")) {
      if (target.nextSibling) {
        target.nextSibling.focus();
      }
    }
  };

  useEffect(() => handleSubmit(), [submit]);

  const handleSubmit = () => {
    if (value === word[index]) {
      setIsInWord(true);
      setIsInPosition(true);
      setIsCorrect(true)
    } else if (value === "") {
      setIsInWord(false);
      setIsInPosition(false);
    } else if (word.includes(value)) {
      setIsInWord(true);
      setIsInPosition(false);
    } else {
      setIsInWord(false);
      setIsInPosition(true);
    }
  };

  return (
    <>
      <input
        id={`${rowNumber}${index}`}
        data-index={index}
        disabled={submit}
        maxLength="1"
        type="text"
        value={value}
        onChange={handleChange}
        className={styles.input}
        style={{
          backgroundColor: isInWord
            ? isInPosition
              ? "green"
              : "yellow"
            : "white",
          color: isInPosition && isInWord ? "white" : "black",
        }}
      />
    </>
  );
}
