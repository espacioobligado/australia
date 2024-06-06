'use client'
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { fetchOrCreateUser } from '../../../Helpers/fetchOrCreateUser';
import Link from 'next/link';

const Footer = () => {
    const [cookies, setCookie] = useCookies(['usuario']);
    const [usuario, setUsuario] = useState('');
    
    useEffect(() => {
        fetchOrCreateUser(cookies, setCookie, setUsuario);
    }, [cookies.usuario, setCookie]);

    return (
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column' }}> 
             <div className='footer' style={{ flexShrink: '0', textAlign: 'center', marginBottom: '150px' }}>
                <Link href={`/Australia/Chat/with/${usuario}`}>
                    <div className="dawning-of-a-new-day-regular" style={{ fontSize: '50px'}}>
                        gestionalo {usuario}
                    </div>  
                </Link>
            </div> 
        </div>
    )
}

export default Footer;
