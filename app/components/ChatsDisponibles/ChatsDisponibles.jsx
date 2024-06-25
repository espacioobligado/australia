'use client' 
import  SocketChat  from "../socket/SocketChat";
import { useEffect, useState, useRef } from "react";      
import {getMensajes,getChatsFrom, getMensajesDe,getUsuariosRemitentes} from '../../../Helpers/Chats'

const ChatsDisponibles = ({isMobile, userIdPublicador}) => {
    const [chatsDisponibles, setChatsDisponibles] = useState([]);
    const [mensajes1, setMensajes1] = useState([]);
    const [chatSeleccionado, setChatSeleccionado] = useState(null);  
    const [chatId, setChatId] = useState([]);
    const [chatIdAnterior, setChatIdAnterior] = useState();
    const [chatsTraidoEnPrimerLlamado, setChatsTraidoEnPrimerLlamado] = useState([]);
    const messagesRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        const fetchMensajes = async () => {
            if (chatSeleccionado && chatSeleccionado.length > 0) {
                const chatIdActual = chatSeleccionado[0].chat_id;
                if (chatIdActual !== chatIdAnterior) {
                    const mensajesDeLosChats = await getMensajesDe(chatIdActual);    
                    setChatSeleccionado(mensajesDeLosChats);
                    setChatId([chatIdActual,mensajesDeLosChats[0].remitente,userIdPublicador ])
                    setChatIdAnterior(chatIdActual);
                    scrollToBottom();
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
            setChatsTraidoEnPrimerLlamado(chatsDelUserId)
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
            console.log(1,filteredChatCreation)

            // const checkiarChatsNuevos = async() => {
            //     chatsIntervalCheckiando = await getChatsFrom(userIdPublicador)  
            //     console.log('A',chatsIntervalCheckiando)                              
            // }
            // const intervalId = setInterval(checkiarChatsNuevos, 10000);
    
            // setTimeout(() => {
            //     checkiarChatsNuevos()
            // }, 5000);
    
            
        };   
        fetchUserId()
        
    }, [userIdPublicador]); 
 
    ///
    ///
    /// TARDA EN METER SOCKET ID , NO SE PORQUE ESTRABA Lo de b y A SI EL CHAT ES EL MISMO SEA ARRIBOS O LASTCALL
    /// 
    ///
    useEffect(() => {
        const fetchUserId = async () => {
            const chatsDelUserId = await getChatsFrom(userIdPublicador)   
            setChatsTraidoEnPrimerLlamado(chatsDelUserId)
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
            console.log(1,filteredChatCreation)

            // const checkiarChatsNuevos = async() => {
            //     chatsIntervalCheckiando = await getChatsFrom(userIdPublicador)  
            //     console.log('A',chatsIntervalCheckiando)                              
            // }
            // const intervalId = setInterval(checkiarChatsNuevos, 10000);
    
            // setTimeout(() => {
            //     checkiarChatsNuevos()
            // }, 5000);
    
            
        };   
        const checkeoChatsBbDd = async () => {
            // console.log('chatsTraidoEnPrimerLlamado',chatsTraidoEnPrimerLlamado)
            const chatsDelUserIdLLamado2 = await getChatsFrom(userIdPublicador)   
            // console.log('chatsTraidoEn 2 Llamado',chatsDelUserIdLLamado2)
            // const miroBbDD = async() => {
            //     if(chatsDelUserId.length !== 0){
            //         console.log('Hola _ los chats van;', chatsDelUserId)
            //     }
            //     const checkqueoBbDdNuevosChats = await getChatsFrom(userIdPublicador)
            //     if(checkqueoBbDdNuevosChats.length !== 0){
            //         console.log('Hola _ los checkqueo de NuevosChats van;', chatsDelUserId)
            //     }
            // }
            //
            // return () => clearInterval(intervalId);
            if(chatsTraidoEnPrimerLlamado.length !== 0){
                if(chatsTraidoEnPrimerLlamado.length !== chatsDelUserIdLLamado2.length){
                    if(chatsDelUserIdLLamado2.length !== 0){
                        // console.log('chats nuevos con viejos',chatsDelUserIdLLamado2)
                        fetchUserId()
                    }
                }
            }
        }
        // checkeoChatsBbDd()
        setInterval(checkeoChatsBbDd, 10000)
    },[chatsDisponibles])



    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
                        <div style={{ maxHeight: '700px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px',position: 'relative' }}>
                            <ul ref={messagesRef} id="messages" style={{ listStyleType: 'none', padding: '0', height: '680px' ,WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none'}}>
                                {chatSeleccionado.map(mensaje => (
                                    <div key={mensaje.id} style={{ marginBottom: '5px', padding: '8px', borderRadius: '8px', textAlign: mensaje.remitente === userIdPublicador ? 'right' : 'left' }}>
                                        <div style={{ 
                                        background: mensaje.remitente === userIdPublicador ? '#DCF8C6' : '#EFEFEF',
                                        display: 'inline-block',
                                        marginRight: mensaje.remitente === userIdPublicador ? '0' : '5px',
                                        marginLeft: mensaje.remitente === userIdPublicador ? '5px' : '0',
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