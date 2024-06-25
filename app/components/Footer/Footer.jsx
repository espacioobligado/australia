'use client'
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import crearUsuario from '../../components/usuarios';

const Footer = () => {
    const [cookies, setCookie] = useCookies(['usuario']);
    const [usuario, setUsuario] = useState('');
    
    useEffect(() => {
        const fetchOrCreateUser = async () => {
            try {
                if (!cookies.usuario) {
                    const nuevoUsuario = await crearUsuario();
                    setUsuario(nuevoUsuario);
                    setCookie('usuario', nuevoUsuario, { path: '/' });
                }
                else {
                    setUsuario(cookies.usuario);
                }
            } catch (error) {
                console.error('Error al obtener o crear el usuario:', error);
            }
        };
        fetchOrCreateUser()
    }, [cookies.usuario, setCookie]);

    return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> 
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
