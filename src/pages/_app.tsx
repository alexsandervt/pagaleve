import '../styles/global.scss'
import styles from '../styles/app.module.scss'

import { Header } from "../components/Header";
import { Sidebar } from '../components/Sidebar'

function MyApp({ Component, pageProps }) {
  return( 
  
    <div className={styles.wrapper}>
      
      <main>
      <Header/>
      <Component {...pageProps} />
     
      </main>
      <Sidebar/>
    

    </div>
    
    );
}

export default MyApp;
