import React from 'react';
import styles from './NiceButton.module.css'

export default function NiceButton ({handleClick, children}) {
  return (
    <button onClick={handleClick} className={styles.pushable}>
  <span className={styles.shadow}></span>
  <span className={styles.edge}></span>
  <span className={styles.front}>
    {children}
  </span>
</button>
  )
}