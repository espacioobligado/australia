'use client' 
import  SocketChat  from "../socket/SocketChat";
import { useEffect, useState } from "react";      
import {getMensajesDe,getMensajes,getChatsFrom,getUsuariosRemitentes} from '../../../Helpers/Chats'

const ChatsDisponibles = ({isMobile, userIdPublicador}) => {
    const [chatsDisponibles, setChatsDisponibles] = useState([]);
    const [mensajes1, setMensajes1] = useState([]);
    const [chatSeleccionado, setChatSeleccionado] = useState(null);  
    const [chatIdAnterior, setChatIdAnterior] = useState();
    const [chatId, setChatId] = useState([]);

    useEffect(() => {
        const fetchMensajes = async () => {
            if (chatSeleccionado && chatSeleccionado.length > 0) {
                const chatIdActual = chatSeleccionado[0].chat_id;
                if (chatIdActual !== chatIdAnterior) {
                    const mensajesDeLosChats = await getMensajesDe(chatIdActual);    
                    setChatSeleccionado(mensajesDeLosChats);
                    setChatId([chatIdActual,mensajesDeLosChats[0].remitente,userIdPublicador ])
                    setChatIdAnterior(chatIdActual);
                }
            }
        };
        fetchMensajes();
    }, [chatSeleccionado, chatIdAnterior]);

    const handleClickChat = async (chatId) => {
        const mensajesChat = mensajes1.filter(mensaje => mensaje.chat_id === chatId);
        
        mensajesChat.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        setChatSeleccionado(mensajesChat);
    };                            

    useEffect(() => {
        const fetchUserId = async () => {
            const chatsDelUserId = await getChatsFrom(userIdPublicador)                                
            const mensajesDeLosChats = await getMensajes(chatsDelUserId.map(c => c.id))     
            setMensajes1(mensajesDeLosChats)                                              
            const mensajesAgrupados = mensajesDeLosChats.reduce((acc, mensaje) => {
                            if (acc[mensaje.chat_id]) {
                                acc[mensaje.chat_id].push(mensaje.contenido);
                            } else {
                                acc[mensaje.chat_id] = [mensaje.contenido];
                            }
                            return acc;
                        }, {});

            let chatCreationPromises = chatsDelUserId.map(async chat => {
                const mensajesCorrespondientes = mensajesAgrupados[chat.id];
                if (mensajesCorrespondientes && mensajesCorrespondientes.length > 0) {
                    const objecto = { 
                        id: chat.id,
                        publicacionDeUsuario: userIdPublicador,
                        remitente: chat.remitente,
                        nombreRemitente: await getUsuariosRemitentes(chat.remitente),
                        mensajes: mensajesCorrespondientes
                    };
                    return objecto;
                } else {
                    return null;  
                }
            });
            chatCreationPromises = chatCreationPromises.filter(chat => chat !== null && chat !== undefined);

            const chatCreation = await Promise.all(chatCreationPromises);
            const filteredChatCreation = chatCreation.filter(chat => chat !== null);
            setChatsDisponibles(filteredChatCreation)
        };   
    fetchUserId();
    }, [userIdPublicador]); 

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>Y TUS CHATS DISPONIBLES</h2>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                {chatsDisponibles.length !== 0 ? (
                    chatsDisponibles.map(chat => (
                        <li key={chat.id} onClick={() => handleClickChat(chat.id)} style={{ cursor: 'pointer', margin: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', width: '300px' }}>
                            <p><strong>{chat.nombreRemitente}</strong></p>
                        </li>
                    ))
                    ) : (
                    <li style={{ margin: '10px' }}>nao tein</li>
                )}
                </ul>
            </div>
            {chatSeleccionado && (
                <div>
                    <h2>Mensajes del Chat</h2>              
                    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                        <div style={{ maxHeight: '700px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px', overflowY: 'auto' }}>
                            <ul id="messages" style={{ listStyleType: 'none', padding: '0', height: 'calc(100% - 20px)' }}>
                                {chatSeleccionado.map(mensaje => (
                                    <div key={mensaje.id} style={{ marginBottom: '5px', padding: '8px', borderRadius: '8px', textAlign: mensaje.remitente === userIdPublicador ? 'right' : 'left' }}>
                                        <div style={{ 
                                        background: mensaje.remitente === userIdPublicador ? '#DCF8C6' : '#EFEFEF',
                                        display: 'inline-block',
                                        marginRight: mensaje.remitente === usuario ? '0' : '5px',
                                        marginLeft: mensaje.remitente === usuario ? '5px' : '0',
                                        padding: '5px',
                                        borderRadius: '5px',
                                        maxWidth: '80%',  
                                        wordWrap: 'break-word',  
                                        }}>
                                        {mensaje.contenido}   
                                        <p style={{ fontSize: '12px', opacity: 0.5, textAlign: 'right' }}>{mensaje.timeenviado}</p>
                                    </div>
                                </div>
                                ))}
                            </ul>
                        </div>
                        <SocketChat key={chatId} value={chatId}/>       
                    </div>
                </div>                              
            )}  
            </>
    )
}

export default ChatsDisponibles