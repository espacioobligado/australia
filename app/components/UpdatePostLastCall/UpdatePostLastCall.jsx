"use client"                                     
import { useEffect, useState } from "react";       
import  SocketChat  from "../socket/SocketChat";
import {getMensajesDe,getMensajes,getChatsFrom,getUsuariosRemitentes,getUsuarioId,getLastCallFromUsers,getArribosFromUsers} from '../../../Helpers/Chats'
import Clock from '../Clock/Clock'
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from "react-google-recaptcha";
import { mobile359 } from '../../../Helpers/mobile359';
import ChatsDisponibles from '../ChatsDisponibles/ChatsDisponibles';
import PosteosDelUsuario from '../PosteosDelUsuario/PosteosDelUsuario';

const UpdatePostLastCall = (usuario) => { 
    const isMobile = mobile359()
    const [userIdPublicador, setUserIdPublicador] = useState();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
      }, []); 
  
    useEffect(() => {
        const getUserId = async() => {
                const userId = await getUsuarioId(usuario.value) 
                setUserIdPublicador(userId) 
        }
        getUserId()
    },[])

 

 
  if (!isMounted) {
        return null;
    } else {
    return (
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column',alignItems: 'center',  overflowX: 'hidden' }}> 
            <Clock/>
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