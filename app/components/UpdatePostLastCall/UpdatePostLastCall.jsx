"use client"                                     
import { useEffect, useState } from "react";       
import  SocketChat  from "../socket/SocketChat";
import {getMensajesDe,getMensajes,getChatsFrom,getUsuariosRemitentes,getUsuarioId,getLastCallFromUsers,getArribosFromUsers} from '../../../Helpers/Chats'

import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from "react-google-recaptcha";
import { mobile375 } from '../../../Helpers/mobile375';
import ChatsDisponibles from '../ChatsDisponibles/ChatsDisponibles';
import PosteosDelUsuario from '../PosteosDelUsuario/PosteosDelUsuario';
import LoginOrRegister from '../LoginOrRegister/LoginOrRegister';

const UpdatePostLastCall = (usuario) => { 
    const isMobile = mobile375()
    const [userIdPublicador, setUserIdPublicador] = useState();
    const [isMounted, setIsMounted] = useState(false);
    const [showLoginOrRegister, setShowLoginOrRegister] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        console.log(usuario)
      }, []); 
  
    useEffect(() => {
        const getUserId = async() => {
                const userId = await getUsuarioId(usuario.value) 
                setUserIdPublicador(userId) 
        }
        getUserId()
    },[])

    function abrirLoginOrRegister() {
        // Obtener el elemento del botón
        var boton = document.querySelector('button');
    
        // Agregar un evento clic al botón
        boton.addEventListener('click', function() {
            // Obtener el valor del usuario (si es necesario)
            var usuario = boton.textContent;
    
            // Por ejemplo, podrías mostrarlo cambiando su estilo de visualización
            var loginOrRegister = document.querySelector('.LoginOrRegister');
            loginOrRegister.style.display = 'block'; // Cambiar a 'flex' si es un contenedor de tipo flex
        });
    }

    const handleButtonClick = () => {
        setShowLoginOrRegister(true);
    };
  if (!isMounted) {
        return null;
    } else {
    return (
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column',alignItems: 'center' }}> 
           <h1 style={{ marginBottom: '10px', textAlign: 'center' }}>Holaaaaaa 
                <span style={{ marginLeft: '5px', marginRight: '5px' }}></span>
                <span style={{ color: 'violet' }}>
                    <button onClick={handleButtonClick}>{usuario.value}</button>
                </span>
            </h1>
            {/* {showLoginOrRegister && <LoginOrRegister usuario={usuario.value} />} */}

            <PosteosDelUsuario
            userIdPublicador={userIdPublicador}
            // usuario={usuario.value}
            isMobile={isMobile}
            />

            <ChatsDisponibles 
            isMobile={isMobile}
            // usuario={usuario.value}
            userIdPublicador={userIdPublicador}
            />
        </div>
    );
    }
}

export default UpdatePostLastCall;