import React, { useState } from 'react';
import styles from './Burger.module.css';
import Link from 'next/link';

const Burger = ({ activeLink }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-label="Toggle navigation"
        className={styles.toggler}
        onClick={toggle}
      >
        &#8801;
      </button>
      <div className={`${styles.slideMenu} ${open ? styles.open : ''}`}>
        <button className={styles.closeButton} onClick={toggle}>&times;</button>
        <div className={styles.navLinks}>
          <Link href="/Australia/Yovoy" passHref>
            <div className={`${styles.hoverEffect} ${activeLink === "Yovoy" ? styles.active : ""}`} onClick={closeMenu}>
              <div>Yo Voy</div>
            </div>
          </Link>
          <Link href="/Australia/Yonecesito" passHref>
            <div className={`${styles.hoverEffect} ${activeLink === "Yonecesito" ? styles.active1 : ""}`} onClick={closeMenu}>
              <div>Yo Necesito</div>
            </div>
          </Link>
          <Link href="/Australia/Arribos" passHref>
            <div className={`${styles.hoverEffect} ${activeLink === "Arribos" ? styles.active : ""}`} onClick={closeMenu}>
              <div>Arribos</div>
            </div>
          </Link>
          <Link href="/Australia/Lastcall" passHref>
            <div className={`${styles.hoverEffect} ${activeLink === "Lastcall" ? styles.active1 : ""}`} onClick={closeMenu}>
              <div>Last call</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Burger;
