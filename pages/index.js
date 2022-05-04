import Head from "next/head";
import styles from "../styles/Home.module.css";
import Pokedex from "../components/Pokedex/Pokedex";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ye Olde Pokemon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <h1 className={styles.title}>Search for Pokemon, shakespearian style!</h1>
        <Pokedex />
      </main>
    </div>
  );
}
