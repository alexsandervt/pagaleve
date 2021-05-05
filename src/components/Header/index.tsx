import styles from './styles.module.scss'

export function Header(){
  return(
    <header className={styles.headerContainer}>
      <img src="logo.svg" alt="PagaLeva"/>

      <button> Clientes</button>

    </header>
  )
}