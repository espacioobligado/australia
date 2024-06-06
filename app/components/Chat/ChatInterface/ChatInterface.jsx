"use client";
import { useEffect, useState, useRef  } from "react";
import SocketChat  from "../../socket/SocketChat";
import {fetchOrCreateUser} from "../../../../Helpers/fetchOrCreateUser";
import { useCookies } from 'react-cookie';
import { socket } from '../../socket/socket';
import {getMensajesDe,getChatsFromUsers,getUsuariosIdDelChat,getUsuarioId} from '../../../../Helpers/Chats'

socket.connect();

const ChatInterface = (id) => {
    const [cookies, setCookie] = useCookies(['usuario']);
    const [usuario, setUsuario] = useState('');
    const [usuarioId, setUsuarioId] = useState(1);
    const [lastconnection, setLastconnection] = useState(false);
    const [mensajes, setMensajes] = useState([]);
    const scrollToTop = useRef(null);
    const scrollToLastMessage = useRef(null);
    const [dots, setDots] = useState('.');
    const [cheuqueo, setCheuqueo] = useState(false);
    const [chatId, setChatId] = useState([]);
     
    let usuario34 = id.value.params.usuario;                       
    const publicacionDeUsuari  = usuario34.replace(/%20/g, ' ');  
    const publicacionDeUsuario = decodeURIComponent(publicacionDeUsuari);

    useEffect(() => {
        socket.on('chat_id', chat_id => {
        setCheuqueo(false)
        })
    },[])//socket chat_id

    useEffect(() => {
      const fetchUserId = async () => {
        try{
        const userId1publicacionDeUsuario = await getUsuarioId(publicacionDeUsuario) 
        const userId2 = await getUsuarioId(usuario) 
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
       
    }, [cheuqueo]);//crear los chats
    useEffect(() => {
      setCheuqueo(true)
  }, []);
  
    // useEffect(() => {
    //   scrollToTop.current.scrollIntoView({ behavior: "smooth" });
    // }, [mensajes]);//scroll
    useEffect(() => {
      if (scrollToLastMessage.current !== null) {
          scrollToLastMessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
  }, [mensajes]);
  
    useEffect(() => {
          const llamar = async () => {
              try {
                  let usuarios = await getUsuariosIdDelChat()
                  const indexUsuarioEncontrado = usuarios.findIndex(usuario => usuario.nombre === publicacionDeUsuario);
                  const fecha = new Date(usuarios[indexUsuarioEncontrado].lastconnection);
                  const fechaActual = new Date();
                  const diferenciaMilisegundos = fechaActual - fecha;
                  const diferenciaMinutos = Math.floor(diferenciaMilisegundos / (1000 * 60));
                  const diferenciaHoras = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));
                  const diferenciaDias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
                  let mensaje = '';

                  if (diferenciaDias === 1) {
                      mensaje = `última conexión hace ${diferenciaDias} día`;
                  } else if (diferenciaDias > 1) {
                    mensaje = `última conexión hace ${diferenciaDias} días`;
                  }else if (diferenciaDias >= 7) {
                    mensaje = `última conexión hace 1 semana`;
                  }else if (diferenciaDias >= 30) {
                    mensaje = `última conexión hace 1 mes`;
                  }else if (diferenciaDias >= 60) {
                    mensaje = `última conexión hace 2 meses`;
                  }else if (diferenciaDias >= 30) {
                    mensaje = `última conexión hace 3 meses`;
                  }else if (diferenciaHoras >= 2) {
                      mensaje = `última conexión hace ${diferenciaHoras} horas`;
                  } else if (diferenciaHoras === 1) {
                      mensaje = `última conexión hace ${diferenciaHoras} hora`;
                  } else if (diferenciaMinutos === 0 || diferenciaMinutos >= 2) {
                      mensaje = `última conexión hace ${diferenciaMinutos} minutos`;
                  }else if ( diferenciaMinutos === 1) {
                    mensaje = `última conexión hace ${diferenciaMinutos} minuto`;
                  }  
                  setLastconnection(mensaje);
                } catch (error) {
                  console.error('Error al obtener getusuarios:', error);
              }
          };
          llamar();
          }, []);//ultima conexión

          useEffect(() => {
            const fetchOrCreateUser2 = async () => {
              const usuarioChatterId = await getUsuarioId(cookies.usuario)
              setUsuarioId(usuarioChatterId)
            };
          fetchOrCreateUser2()
          }, [])//Get Usuario Id

    function useChatScroll (dep) {
    const ref = useRef()
    useEffect(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, [dep]);
    return ref;
    }
    const ref = useChatScroll(mensajes)

    useEffect(() => {
      if (scrollToLastMessage.current !== null) {
        scrollToLastMessage.current.scrollIntoView();
        setTimeout(() => {
          scrollToTop.current.scrollIntoView({ behavior: 'smooth' })
        }, 50);
      }
    }, [mensajes]);  //scroll

    useEffect(() => {
        fetchOrCreateUser(cookies,setCookie,setUsuario);
    }, [cookies.usuario, setCookie]);

    return (     
      <>       
        <div style={{ textAlign: 'center' }}>
          <h1 ref={scrollToTop} style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>¡Bienvenido {usuario}!</h1>
          <p style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}></p>
          <p style={{ color: '#666', fontSize: '16px', marginBottom: '20px' }}> {publicacionDeUsuario} : {lastconnection}</p>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ maxHeight: '700px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px', position: 'relative' }}>
              <ul  id="messages" style={{ listStyleType: 'none', padding: '0', height: '680px' ,WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none'}}> 
              {/* ref={ref} */}
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
                        <p style={{ fontSize: '12px', opacity: 0.5,textAlign:'right' }}> {mensaje.timeenviado}</p>
                      </div>
                  </div>
                ))} 
                <div ref={scrollToLastMessage}></div> 
              </ul>
            </div>
               <SocketChat key={chatId} value={chatId}/>  
          </div>
        </div>
    </>

 )
}

export default ChatInterface;