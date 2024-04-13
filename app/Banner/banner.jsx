// Banner.js
import React from 'react';
import styles from './Banner.module.css'; // Importa los estilos CSS


const Banner = () => {
  return (
    <div id="bannerFondo" className={styles.bannerFondo}>
      <div id="texto" className={styles.texto}>
        Cada persona gestiona lo suyo, esta web simplemente ofrece el servicio
      </div>
    </div>
  );
};

export default Banner;
