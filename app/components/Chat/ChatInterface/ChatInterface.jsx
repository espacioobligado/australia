"use client";
import { useEffect, useState, useRef  } from "react";
import SocketChat  from "../../socket/SocketChat";
import { useCookies } from 'react-cookie';
import { socket } from '../../socket/socket';
import {getMensajesDe,getChatsFromUsers,getUsuarioId} from '../../../../Helpers/Chats'
import {llamar} from '../../../../Helpers/lastConnection'

socket.connect();

const ChatInterface = (id) => {
    const [cookies, setCookie] = useCookies(['usuario']);
    const [usuario, setUsuario] = useState('');
    const [usuarioId, setUsuarioId] = useState(1);
    const [lastconnection, setLastconnection] = useState(false);
    const [mensajes, setMensajes] = useState([]);
    const [cheuqueo, setCheuqueo] = useState(false);
    const [chatId, setChatId] = useState([]);
    const scrollToTop = useRef(null);
     
    const messagesRef = useRef(null);
    const scrollToBottom = () => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    };

    let usuario34 = id.value.params.usuario;                       
    const publicacionDeUsuari  = usuario34.replace(/%20/g, ' ');  
    const publicacionDeUsuario = decodeURIComponent(publicacionDeUsuari);
 
    useEffect(() => {
        socket.on('chat_id', chat_id => {
        setCheuqueo(false)
        })
    },[])//socket chat_id

    useEffect(() => {
      const lastConnection = async () => {
        const lastConnection = await llamar(publicacionDeUsuario)
        setLastconnection(lastConnection)
      }
      lastConnection()

      const fetchUserId = async () => {
        try{
        const userId1publicacionDeUsuario = await getUsuarioId(publicacionDeUsuario) 
        const userId2 = await getUsuarioId(cookies.usuario) 

        socket.emit('usuariosEnChat', `${userId2}]${userId1publicacionDeUsuario}`);
          
        let chatId = await getChatsFromUsers(userId1publicacionDeUsuario,userId2)  
        
        setChatId([chatId,userId1publicacionDeUsuario,userId2])
        const mensajesDelChat = await getMensajesDe(chatId)
        if(mensajesDelChat.length == 0){
          setMensajes([{id:'a',contenido:'🔒 Los mensajes estan cifrados. Nadie fuera de este chat puede leerlos.'}]);
        }else{
          setMensajes(mensajesDelChat)                                               
        }
      }catch{
      };   
      }
      fetchUserId();
      
    }, [cheuqueo,publicacionDeUsuario,cookies.usuario]);//crear los chats | lastConnection

    useEffect(() => {
      setCheuqueo(true)
    }, []);
  
    useEffect(() => {
      scrollToBottom()
    },[mensajes])

    useEffect(() => {
      const fetchOrCreateUser2 = async () => {
        const usuarioChatterId = await getUsuarioId(cookies.usuario)
        setUsuarioId(usuarioChatterId)
      };
    fetchOrCreateUser2()
    }, [cookies.usuario])//Get Usuario Id
//agreuge [cookies.usuario] por error en compiler en arribos tambien handleUpdate en [] por mismo error 
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
      <>       
        <div style={{ textAlign: 'center' }}>
          <h1 ref={scrollToTop} style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>¡Bienvenido {usuario}!</h1>
          <p style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}></p>
          <p style={{ color: '#666', fontSize: '16px', marginBottom: '20px' }}> {publicacionDeUsuario} : {lastconnection}</p>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ maxHeight: '700px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px', position: 'relative' }}>
              <ul ref={messagesRef} id="messages" style={{ listStyleType: 'none', padding: '0', height: '680px' ,WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none'}}> 
               {mensajes.map((mensaje, index) => (
                  <div key={mensaje.id} style={{ marginBottom: '5px', padding: '8px', borderRadius: '8px', textAlign: mensaje.remitente === usuarioId ? 'right' : 'left' }}>
                      <div style={{ 
                        background: mensaje.remitente === usuarioId ? '#DCF8C6' : '#EFEFEF',
                        display: 'inline-block',
                        marginRight: mensaje.remitente === usuarioId ? '0' : '5px',
                        marginLeft: mensaje.remitente === usuarioId ? '5px' : '0',
                        padding: '5px',
                        borderRadius: '5px',
                        maxWidth: '80%',  
                        wordWrap: 'break-word',  
                      }}>
                        {mensaje.contenido}  
                        <p style={{ fontSize: '12px', opacity: 0.5,textAlign:'right' }}>{mensaje.timeenviado}</p>
                      </div>
                  </div>
                ))} 
              </ul>
            </div>
            <SocketChat key={chatId} value={chatId}/>  
          </div>
        </div>
    </>
 )
}

export default ChatInterface;