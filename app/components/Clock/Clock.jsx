'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
// import link from './checkIn.png';
import link from '../../../public/checkIn1.png';
import link2 from '../../../public/downArrow.png';
import link3 from '../../../public/upArrow.png';
import link4 from '../../../public/flight.png';
// import link4 from '../../../public/takeOff2.png';
// import link4 from '../../../public/departure.png';
 import styles from './Clock.module.css'


const Reloj = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const horas = time.getHours();
  const minutos = time.getMinutes();
  const segundos = time.getSeconds();

  return (
    <>
    {/* Clockv1 */}
        {/* <div class="bienvenido1">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="bienvenido2">
        </div>
        <div style={{display:'flex',position:'relative' }}>
            <div class="linea-izquierda"></div>
            <div class="linea-derecha"></div>
        </div>
       
        <div class="cartel-colgante">
        <p>{horas < 10 ? `0${horas}` : horas} : {minutos < 10 ? `0${minutos}` : minutos} : {segundos < 10 ? `0${segundos}` : segundos}</p>
        </div>
        <div class="cartel-colgante2">
        </div> */}
        {/* #E0A200 */} 
            <div className={styles.bienvenido1} style={{display:'flex',justifyContent: 'space-between',height:'100px'}}>
                <div style={{display:'flex',cursor:'pointer'}}>
                    {/* <Image src={link2} alt="Imagen" width={100} height={30} style={{ cacheControl: 'max-age=2592000', transform: 'rotate(180deg)' }}/>  */}
                    <Image 
                    src={link4}
                    alt="Imagen"
                    width={100}
                    style={{ cacheControl: 'max-age=2592000', height: '80%',marginTop:'10px' }}/> 
                    <h2 style={{marginTop:'10px',marginLeft:'5px',fontSize:'20px'}}>Gates</h2>
                </div>
                <div style={{display:'flex',cursor:'pointer'}}>
                    <h2 style={{marginTop:'10px',marginRight:'5px',fontSize:'20px'}}>Check in</h2>
                    <Image 
                    src={link} 
                    alt="Imagen" 
                    width={100} 
                    style={{ cacheControl: 'max-age=2592000', height: '80%',marginTop:'10px' }}/> 
                    {/* <Image src={link2} alt="Imagen" width={100} height={30} style={{ cacheControl: 'max-age=2592000' }}/>  */}
                </div>
            </div>
        <div className={styles.bienvenido2}>
        </div>
        <div style={{display:'flex',position:'relative' }}>
            <div className={styles.lineaIzquierda}></div>
            <div className={styles.lineaDerecha}></div>
        </div>
       
        <div className={styles.cartelColgante} 
        style={{
          display:'flex',
          flexDirection:'column', 
          fontFamily: 'digital-7',
          fontWeight: 400,
          fontSize:'30px',
          textShadow: '0 0 5px rgba(255, 0, 0, 0.5), 0 0 10px rgba(255, 0, 0, 0.5), 0 0 20px rgba(255, 0, 0, 0.5)'
          }}>
            {horas < 10 ? `0${horas}` : horas} : {minutos < 10 ? `0${minutos}` : minutos} : {segundos < 10 ? `0${segundos}` : segundos}
        </div>
        <div className={styles.cartelColgante2}>
        </div>
    </>
  );
};

{/* <div class="reloj">
  <div style={{ color: 'red', backgroundColor: 'black', borderRadius: '10px', textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: '15px', fontWeight: 'bold', textShadow: '0 0 20px red' }}>
  <p>{horas < 10 ? `0${horas}` : horas} : {minutos < 10 ? `0${minutos}` : minutos} : {segundos < 10 ? `0${segundos}` : segundos}</p>
  </div>
  </div> */}

export default Reloj;
