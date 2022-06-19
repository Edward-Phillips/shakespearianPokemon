import Head from "next/head";
import styles from "../styles/Home.module.css";
import PokedexSearch from "../components/PokedexSearch/PokedexSearch";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ye Olde Pokemon</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Link href="/whosthatpokemon">Try and guess the pokemon!</Link>
        <PokedexSearch />
    </div>
  );
}
