import styles from "./styles.module.scss";
import Image from "next/image";

export function Sidebar() {
  return (
    <section className={styles.sideContainer}>
      <button> Adicionar cliente</button>
    </section>
  );
}
