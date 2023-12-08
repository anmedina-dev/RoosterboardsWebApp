import KeyboardAnimation from "~/components/KeyboardScene";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <article className={`container ${styles.homePage}`}>
      <header className={styles.appHome}>
        <section className={styles.appHeader}>
          <h1>Roosterboards Company</h1>
          <h4>Original Keyboards, Switches, Keycaps, etc.</h4>
        </section>
        <section className={styles.keyboardSection}>
          <KeyboardAnimation />
        </section>
      </header>
    </article>
  );
}
