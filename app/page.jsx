import Head from 'next/head';
import Image from 'next/image';
import styles from './styles/Home.module.css';
//import styles from '../app/styles/Home.module.css';
import Link from 'next/link';
//import Tasks from './api/tasks'
import conn from '../lib/db'
import Banner from './Banner/banner'
//import Yovoy from './Yovoy/page'
import Arrivos from './[country]/Arrivos/Arrivos'
import Lastcall from './[country]/Lastcall/Lastcall'

 



export default async function Home(  ) {

 
  const countries = [
     'Australia'
  ];

   
  return (
    <div> 
      <div style={{ minHeight: '90vh' }}>
        <Link href={`/Yovoy`}>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                      <span style={{textDecoration: 'none', color: '#333', padding: '10px 20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s' }}>
                        Yo Voy
                      </span>
                    </div>
        </Link>
        
        <main className={styles.main}>

          <div className={styles.imageContainer}>
            <Image src="er.svg" alt="Imagen" width={500} height={300} />
          </div>
          
          <h1>Australia</h1>

        </main>             
          <Arrivos />

          <Lastcall  />        
      </div>
      <div className='footer'>
          Cada persona gestiona lo suyo, esta web simplemente ofrece el servicio
        </div>
    </div>
  );
}