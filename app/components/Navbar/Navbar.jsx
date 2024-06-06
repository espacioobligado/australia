'use client'

import Image from 'next/image';
import link from './er.svg';
import { useRouter } from 'next/navigation'
import {mobile496} from '../../../Helpers/mobile496'
import { useState, useEffect } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const router = useRouter()
    const pathname = usePathname()
    let isMobile = mobile496(); 
    const [isMounted, setIsMounted] = useState(false);
    const [activeLink, setActiveLink] = useState(""); 

    useEffect(() => {
        if (pathname) {
            const activeRoute = pathname.split("/").pop();
            setActiveLink(activeRoute);
        }
    }, [pathname]);

useEffect(() => {
  setIsMounted(true);
}, []);



//no funcioan el mobile a menos que se vaya cada vez setIsMounted
if (!isMounted) {
    return null;
  }else{
    return (
            <div style={{ minHeight:isMobile? '1vh': '60vh', display: 'flex', flexDirection: 'column' }}> 
                <nav style={{ flex: '1' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                        <h1 onClick={() => router.push('/Australia')} style={{ cursor: 'pointer' }}>Australia</h1>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px',textAlign:'center',alignItems:'wrap'}}>
                            <Link href="/Australia/Yovoy" passHref>
                                <div className={`hover-effect ${activeLink === "Yovoy" ? "active" : ""}`}>
                                    <div>Yo Voy</div> 
                                </div>
                            </Link>
                            <Link href="/Australia/Yonecesito" passHref>
                                <div className={`hover-effect ${activeLink === "Yonecesito" ? "active1" : ""}`}>
                                    <div>Yo Necesito</div>   
                                </div>
                            </Link>
                            <Link href="/Australia/Arribos" passHref>
                                <div className={`hover-effect ${activeLink === "Arribos" ? "active" : ""}`}>
                                    <div style={{height:isMobile?'6vh':'',alignContent:isMobile?'center':''}}>Arribos</div>  
                                </div>
                            </Link>
                            <Link href="/Australia/Lastcall" passHref>
                                <div className={`hover-effect ${activeLink === "Lastcall" ? "active1" : ""}`}>
                                    <div>Last call</div> 
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Image src={link} alt="Imagen" width={500} height={300} style={{ cacheControl: 'max-age=2592000' }}/> 
                        </div>
                    </div>
                </nav>
            </div>
            )
  }
}

export default Navbar;