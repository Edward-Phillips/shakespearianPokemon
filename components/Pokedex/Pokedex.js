import Navbar from "./Navbar/Navbar";
import styles from './Pokedex.module.css';

export default function Pokedex({navbar, children}) {
  return (
    <div style={{height:'100%', width: '100%', display: 'grid'}}>
      <div id="pokedex" className={styles.container}>
        <div id="navbar" className={styles.navbar}>
        <Navbar navbar={navbar} />
        </div>
        <div id="pokedexContent" style={{gridArea: 'content', alignSelf: 'center'}}>
        {children}
        </div>
      </div>
    </div>
  );
}
