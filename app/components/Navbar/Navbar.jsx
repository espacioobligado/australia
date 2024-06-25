'use client';

import Image from 'next/image';
import link from './er.svg';
import { useRouter } from 'next/navigation';
import { mobile427 } from '../../../Helpers/mobile427';
import { useState, useEffect } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from '../../components/SearchBar/SearchBar';
import LoginOrRegister from '../LoginOrRegister/LoginOrRegister';
import { useCookies } from 'react-cookie';
import styles from './Navbar.module.css';
import { useSearchBar } from '../../SearchBarContext';
import Burger from '../Burger/Burger'

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  let isMobile = mobile427();
  const [isMounted, setIsMounted] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [showLoginOrRegister, setShowLoginOrRegister] = useState(false);
  const [cookies, setCookie] = useCookies(['usuario']);
  const [usuario, setUsuario] = useState('');
  const { handleUpdateDisplayServicios, handleUpdateDisplayArribos  } = useSearchBar();

  useEffect(() => {
    if (pathname) {
      const activeRoute = pathname.split("/").pop();
      setActiveLink(activeRoute);
    }
  }, [pathname]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleButtonClick = () => {
    setShowLoginOrRegister(true);
  };

  const handleCloseModal = () => {
    setShowLoginOrRegister(false);
  };

  useEffect(() => {
    const fetchOrCreateUser = async () => {
      try {
        if (!cookies.usuario) {
          const nuevoUsuario = await crearUsuario();
          setUsuario(nuevoUsuario);
          setCookie('usuario', nuevoUsuario, { path: '/' });
        } else {
          setUsuario(cookies.usuario);
        }
      } catch (error) {
        console.error('Error al obtener o crear el usuario:', error);
      }
    };
    fetchOrCreateUser();
  }, [cookies.usuario, setCookie]);

  if (!isMounted) {
    return null;
  } else {
    return (
      <>
        {isMobile ? 
          <div className={styles.containerMobile}>
            <div className={styles.headerMobile}>
              <div className={styles.title}>
                <h1>¿Quien<br />viene?</h1>
              </div>
              <div className={styles.search}>
                <SearchBar 
                onUpdateDisplayServicios={handleUpdateDisplayServicios} 
                onUpdateDisplayArribos={handleUpdateDisplayArribos} 
                />
              </div>
              <Burger/>
              <div className={styles.checkinMobile}>
                <button onClick={handleButtonClick}>Check-in</button>
                {showLoginOrRegister && (
                  <div className={styles.modalContainer} onClick={handleCloseModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                      <LoginOrRegister handleCloseModal={handleCloseModal} usuario={usuario} />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
                  <div style={{ marginRight: '35px' }}>
            <div onClick={() => router.push('/Australia')} style={{ marginTop:'-10px',}}>
              <span style={{ marginLeft:'15px',fontSize:'1vh', cursor: 'pointer' }}>Australia</span>
            </div>
          </div>
          </div>
          :
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.title}>
                <h1>¿Quien<br />viene?</h1>
              </div>
              <div className={styles.search}>
                <SearchBar 
                onUpdateDisplayServicios={handleUpdateDisplayServicios} 
                onUpdateDisplayArribos={handleUpdateDisplayArribos} 
                />
              </div>
              <div className={styles.checkin}>
                <h2>&nbsp;
                  <button onClick={handleButtonClick}>Check-in</button>
                </h2>
                {showLoginOrRegister && (
                  <div className={styles.modalContainer} onClick={handleCloseModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                      <LoginOrRegister handleCloseModal={handleCloseModal} usuario={usuario} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          
            <nav className={styles.nav}>
              <div className={styles.navContainer}>
                <div className={styles.navLinks}>
                <div style={{ marginRight: '35px' }}>
                <div style={{marginRight:'35px'}}>
                    <div className={`${styles.hoverEffect}`} onClick={() => router.push('/Australia')} style={{ cursor: 'pointer' }}>Australia</div>
                  </div>
          </div>
                  <Link href="/Australia/Yovoy" passHref>
                    <div className={`${styles.hoverEffect} ${activeLink === "Yovoy" ? styles.active : ""}`} style={{ marginLeft: '20px' }}>
                      <div style={{ height: isMobile ? '6vh' : '' }}>Yo Voy</div>
                    </div>
                  </Link>
                  <Link href="/Australia/Yonecesito" passHref>
                    <div className={`${styles.hoverEffect} ${activeLink === "Yonecesito" ? styles.active1 : ""}`}>
                      <div style={{ height: isMobile ? '6vh' : '' }}>Yo Necesito</div>
                    </div>
                  </Link>
                  <Link href="/Australia/Arribos" passHref>
                    <div className={`${styles.hoverEffect} ${activeLink === "Arribos" ? styles.active : ""}`}>
                      <div style={{ height: isMobile ? '6vh' : '', alignContent: isMobile ? 'center' : '' }}>Arribos</div>
                    </div>
                  </Link>
                  <Link href="/Australia/Lastcall" passHref>
                    <div className={`${styles.hoverEffect} ${activeLink === "Lastcall" ? styles.active1 : ""}`}>
                      <div style={{ height: isMobile ? '6vh' : '' }}>Last call</div>
                    </div>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        }
        <div className={`${styles.airplane}`}>
            <div id={styles.backgroundWrap}>
                <div className={styles.x1}>
                    <div className={styles.cloud}></div>
                </div>

                <div className={styles.x2}>
                    <div className={styles.cloud}></div>
                </div>

                <div className={styles.x3}>
                    <div className={styles.cloud}></div>
                </div>

                <div className={styles.x4}>
                    <div className={styles.cloud}></div>
                </div>

                <div className={styles.x5}>
                    <div className={styles.cloud}></div>
                </div>
            </div>
            <div className={styles.avionDiv}>
              <div className={styles.imageContainer}>
                <Image className={styles.back} src={link} alt="Imagen" width={500} height={300} />
                <div className={styles.lineasAnimadas} ></div>
              </div>
            </div>
        </div>
      </>
    );
  }
};

export default Navbar;