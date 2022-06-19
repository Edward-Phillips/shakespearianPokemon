import React from 'react';
import styles from './Pokedex.module.css';
export default function Pokedex ({children}) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}