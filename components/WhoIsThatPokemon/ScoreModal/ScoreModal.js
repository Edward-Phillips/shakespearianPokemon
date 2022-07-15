import React from "react";
import styles from "./ScoreModal.module.css";

export default function ScoreModal({ playAgain, lost }) {
  return (
    <>
      {lost ? (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h1>UNLUCKY</h1>
            <p>Unfortunately you didn't get it this time</p>
            <p>You lost your streak...</p>
            <button className={styles.playAgain} onClick={playAgain}>
              Play Again?
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h1>You win!</h1>
            <p>You guessed the pokemon!</p>
            <button className={styles.playAgain} onClick={playAgain}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </>
  );
}
