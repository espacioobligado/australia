'use client'
import { socket } from './socket';
import { useEffect, useState, useRef  } from "react";
import Image from 'next/image';
import link from '../../../public/telegram.svg';

const handleMessage2 = (msg) => {
    if (msg) {
      const now = new Date();
      let hours = now.getHours().toString().padStart(2, '0');  
      const minutes = now.getMinutes().toString().padStart(2, '0');  
      const amOpm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const currentTime = `${hours}:${minutes} ${amOpm}`;
      
      const newItem = document.createElement('div');
      newItem.setAttribute('style', `
          margin-bottom: 5px;
          padding: 8px;
          border-radius: 8px;
      `);

      const flexContainer = document.createElement('div');
      flexContainer.setAttribute('style', `
      display: flex;
      justify-content: flex-start;
      text-align: left;
      `);

      const innerDiv = document.createElement('div');
      innerDiv.setAttribute('style', `
          display: inline-block;
          margin-right: 5px;
          padding: 5px;
          border-radius: 5px;
          max-width: 80%;
          overflow-wrap: break-word;
          background: #EFEFEF;
      `);

      innerDiv.textContent = msg; // Aquí puedes poner el texto dinámico

      const timeParagraph = document.createElement('p');
      timeParagraph.setAttribute('style', `
          font-size: 12px;
          opacity: 0.5;
          text-align: left;
      `);
      timeParagraph.textContent = currentTime; // Aquí puedes poner el texto dinámico

      innerDiv.appendChild(timeParagraph);
      flexContainer.appendChild(innerDiv);
      newItem.appendChild(flexContainer);

      document.getElementById('messages').appendChild(newItem);
      const el = document.getElementById('messages');
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
  }
};

socket.on('event', msg => {      
    // console.log('Hola updater')
    // console.log('msg',msg)
    // if(msg.remitente !== userIdPublicador) {
      handleMessage2(msg.msg)
    // }
})                  //HACER DOBLE TODO Y CADA ARCHIVO TENGA SUS DIFERENCIAS, ABSTRACTO REACTTT

const SocketChat = (id) => {
  const [cheuqueo, setCheuqueo] = useState(false);
  const [ultimoMensajeId, setUltimoMensajeId] = useState(null); 
  const [chatter, setChatter] = useState()
  const [poster, setPoster] = useState()
  const [chatId, setChatId] = useState();

  useEffect(() => {
    // console.log('1---------------------------')
        // console.log(id.value[0])
        // console.log('1---------------------------')
    if(cheuqueo) {
      // console.log('2---------------------------')
        // console.log(id.value[0])
        // console.log('2---------------------------')
      if(id.value.length !== 0){
        // console.log('wwwwwwwwwwwwwwww',id.value)
        // console.log('userId1publicacionDeUsuario',id.value[1])
        setChatId(id.value[0])
        // console.log('3---------------------------')
        // console.log(id.value[0])
        // console.log('3---------------------------')
        setPoster(id.value[1])
        // console.log('userId2',id.value[2])
        setChatter(id.value[2])
        // console.log('userId1publicacionDeUsuario',id[1].value)
        socket.emit('create', id.value[0])
      } 
    } 
  }, [cheuqueo]);

  //recibo chat id , ahora que ?

  useEffect(() => {
            socket.connect();
            setCheuqueo(true)
            return () => {
              socket.disconnect(); // Desconectar el socket al desmontar el componente
          };
}, []);

  // 

  //     // socket.emit('usuariosEnChat2', usuario + ']' + publicacionDeUsuario);
 

  //     useEffect(() => {
  //       socket.on('chat_id', async (chat_id) => {
  //       //  console.log('entre', chat_id)
         
  //       setSoyElchatIdParaElCliente(chat_id)
  //       // if (chat_id) setChequeo(true)
  //       const result = await getmensajes(chat_id);
  //       const mensajesFormateados = result.map(({ id,contenido,remitente,timeenviado }) => {
  //       const fecha = new Date(timeenviado);
  //       let horas = fecha.getHours();
  //       const minutos = fecha.getMinutes().toString().padStart(2, '0');
  //       const amOpm = horas >= 12 ? 'pm' : 'am';
  //       horas = horas % 12 || 12;
  //       const horaFormateada = `${horas}:${minutos} ${amOpm}`;
  //         return {
  //             id,
  //             contenido,
  //             remitente,
  //             timeenviado: horaFormateada
  //         };
  //     }); 
  //       const mensajeConIdMasAlto = mensajesFormateados.reduce((maxMensaje, mensaje) => {
  //                   return mensaje.id > maxMensaje.id ? mensaje : maxMensaje;
  //               }, mensajesFormateados[0]);
  //               // console.log(mensajesFormateados)
  //       if (mensajesFormateados.length === 0 || mensajesFormateados == undefined ) {
  //         setMensajes([{contenido:'🔒 Los mensajes estan cifrados. Nadie fuera de este chat puede leerlos.'}]);
  //       }else{
  //         setMensajes(mensajesFormateados);
  //       }
  //       if (mensajeConIdMasAlto) {
  //         setUltimoMensajeId(mensajeConIdMasAlto.id);  
  //       }
  //     });

    
  // }, []);//get mensajes   socket on chat id 
 
  //     socket.emit("chat message", obj);

      const handleFormSubmit = async(e) => {
        const handleMessage = (msg) => {
          if (msg) {
            // const a = ultimoMensajeId + 1 
            // setUltimoMensajeId(a)
            const now = new Date();
            let hours = now.getHours().toString().padStart(2, '0');  
            const minutes = now.getMinutes().toString().padStart(2, '0');  
            const amOpm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            const currentTime = `${hours}:${minutes} ${amOpm}`;
            
            const newItem = document.createElement('div');
            newItem.setAttribute('style', `
                margin-bottom: 5px;
                padding: 8px;
                border-radius: 8px;
            `);

            const flexContainer = document.createElement('div');
            flexContainer.setAttribute('style', `
                display: flex;
                justify-content: flex-end;
                text-align: right;
            `);
            {/*alignItems: 'center'*/}
            const innerDiv = document.createElement('div');
            innerDiv.setAttribute('style', `
                display: inline-block;
                margin-right: 5px;
                padding: 5px;
                border-radius: 5px;
                max-width: 80%;
                overflow-wrap: break-word;
                background: rgb(220, 248, 198);
            `);

            innerDiv.textContent = msg; // Aquí puedes poner el texto dinámico

            const timeParagraph = document.createElement('p');
            timeParagraph.setAttribute('style', `
                font-size: 12px;
                opacity: 0.5;
                text-align: right;
            `);
            timeParagraph.textContent = currentTime; // Aquí puedes poner el texto dinámico

            innerDiv.appendChild(timeParagraph);
            flexContainer.appendChild(innerDiv);
            newItem.appendChild(flexContainer);

            document.getElementById('messages').appendChild(newItem);
            // newItem.scrollIntoView({ behavior: 'smooth', block: 'end' });
            const el = document.getElementById('messages');
            if (el) {
              el.scrollTop = el.scrollHeight;
            }
        }
      };
 
    e.preventDefault();
    const input = document.getElementById("input");

    handleMessage(input.value)
              if (input.value) { 
                const obj = {
                              msg:input.value,
                              publicacionDeUsuario: poster,  
                              remitente:chatter,
                              chat_id:chatId,
                            }
                socket.emit("chat message", obj);
                input.value = "";
              }
    }; 

    return (
        <>
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', marginBottom: '20px' }}>
              <input
                type="text"
                name="message"
                id="input"
                autoComplete="off"
                style={{ flex: '1', padding: '10px', border: '1px solid #ccc', borderRadius: '5px 0 0 5px' }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0 5px 5px 0',
                  padding: '10px 20px',
                  cursor: 'pointer',
                }}
              >
                <Image src={link} alt="Imagen" width={50} height={30} /> 
              </button>   
        </form>
        </>
    )
} 

export default SocketChat;