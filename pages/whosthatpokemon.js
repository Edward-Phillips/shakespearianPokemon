import React from "react";
import Head from "next/head";
import styles from "../styles/whosThatPokemon.module.css";
import WhoIsThatPokemon from "../components/WhoIsThatPokemon/WhoIsThatPokemon";
import Link from "next/link";

export default function whosThatPokemon() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Who is that Pokemon?</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Link href="/">Back to pokemon Select</Link>
        <WhoIsThatPokemon />
    </div>
  );
}
