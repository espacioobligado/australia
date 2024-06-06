"use client";

import { useEffect, useState, useRef  } from "react";
import UpdatePostLastCall from '../../../../components/UpdatePostLastCall/UpdatePostLastCall';
import ChatInterface from '../../../../components/Chat/ChatInterface/ChatInterface';
import { useCookies } from 'react-cookie';
import {fetchOrCreateUser} from '../../../../../Helpers/fetchOrCreateUser';

const ChatId = (id) => {
    const [cookies, setCookie] = useCookies(['usuario']);
    const [usuario, setUsuario] = useState('');
    
    let object = id.params
    let clave = Object.keys(object)[0];
    const publicacionDeUsuari = object[clave].replace(/%20/g, ' ');
    const publicacionDeUsuario = decodeURIComponent(publicacionDeUsuari);
    
    // console.log(id)
    useEffect(() => {
        fetchOrCreateUser(cookies,setCookie,setUsuario);
    }, [cookies.usuario, setCookie]);

      return (    
      <>      
        {usuario && publicacionDeUsuario ? (
            usuario === publicacionDeUsuario ? (
                <div>
                    <UpdatePostLastCall key={usuario} value={usuario}/> 
                </div>
            ) : ( 
                <ChatInterface key={id} value={id}/>
            )
        ) : ( 
            <>
            </>
        )}
      </>

 )
}

export default ChatId;