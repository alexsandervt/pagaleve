import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <Link href={"/"}>
        <a>
          {" "}
          <Image src="/logo.svg" alt="Image" width={250} height={120} />
        </a>
      </Link>

      <ul>
        <li>
          <a href="#">Home</a>
          <a href="#">Sobre</a>
          <a href="#">Produto</a>
          <a href="#">Preços</a>
          <a href="#">Blog</a>
        </li>
      </ul>
    </header>
  );
}
