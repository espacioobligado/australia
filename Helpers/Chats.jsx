export const getMensajesDe = async (chat_id) => {
  const res = await fetch('/api/getmensajes', { cache: 'no-store' });
  const text = await res.text();
  const retorno = JSON.parse(text);   
  const chatObjs = retorno.filter(mensaje => mensaje.chat_id === chat_id);
  chatObjs.forEach(mensaje => {
      const fechaMensaje = new Date(mensaje.timeenviado);
      let hours = fechaMensaje.getHours().toString().padStart(2, '0');  
      const minutes = fechaMensaje.getMinutes().toString().padStart(2, '0');  
      const amOpm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      mensaje.timeenviado = `${hours}:${minutes} ${amOpm}`;
  });
   return chatObjs; 
} 

export const getMensajes = async (chats_ids) => {
  const res = await fetch('/api/getmensajes', { cache: 'no-store' });
  const text = await res.text();
  const retorno = JSON.parse(text);   
  const chatObjs = retorno.filter(mensaje => chats_ids.includes(mensaje.chat_id));
  chatObjs.forEach(mensaje => {
      const fechaMensaje = new Date(mensaje.timeenviado);
      let hours = fechaMensaje.getHours().toString().padStart(2, '0');  
      const minutes = fechaMensaje.getMinutes().toString().padStart(2, '0');  
      const amOpm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      mensaje.timeenviado = `${hours}:${minutes} ${amOpm}`;
  });
   return chatObjs; 
}
 
export const getUsuariosRemitentes = async (idsRemitentes) => {
    const res = await fetch('/api/getusuarios');
    const text = await res.text();
    const retorno = JSON.parse(text);  
    if (!idsRemitentes || !idsRemitentes.length) {
      const llego = retorno.find(todo => todo.id == idsRemitentes)
      return llego.nombre 
  } 
    if (idsRemitentes) {
      const usuariosFiltrados = retorno.filter(objeto => idsRemitentes.has(objeto.id));
      return usuariosFiltrados;
    } 
}

let arrayDeobjeto2
export const getUsuariosIdDelChat = async (remitente,publicacionDeUsuario) => {
    try {
      const res = await fetch('/api/getusuarios');
      const text = await res.text();
      const retorno = JSON.parse(text);   
      arrayDeobjeto2 = retorno
      if (remitente && publicacionDeUsuario) {
        const usuariosFiltrados = retorno.filter(objeto => [remitente, publicacionDeUsuario].includes(objeto.nombre));
        const idsFiltrados = usuariosFiltrados.map(usuario => usuario.id);
        return idsFiltrados;
      }else{
      return retorno;
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      throw error;  
    }
}

export const getUsuarioId = async (nombre) => {
    const res = await fetch('/api/getusuarios');
    const text = await res.text();
    const retorno = JSON.parse(text);   
    try{
      const usuario = retorno.find(usuario => usuario.nombre == nombre);
      return usuario.id;
    }catch{
      console.error('no se encontro el usuario en la base de datos')
    }
}

export const getChatsFrom = async (usuarioId) => {
  const res = await fetch('/api/getchat', { cache: 'no-store' });
  const text = await res.text();
  const retorno = JSON.parse(text); 
  const chatsFromUser = retorno.filter(chats => chats.publicaciondeusuario == usuarioId);
  return chatsFromUser;  
}

//si no agarra ninguno, crea su primer chat id
export const getChatsFromUsers = async (id1,id2) => {
  const res = await fetch('/api/getchat', { cache: 'no-store' });
  const text = await res.text();
  const retorno = JSON.parse(text);  
  const chatsFromUser = retorno.filter(chats => chats.publicaciondeusuario == id1 && chats.remitente == id2 );
  if (chatsFromUser.length !== 0) {
    return chatsFromUser[0].id;
  }
  else {
    const nuevoChat = {
      remitente: id2,
      publicaciondeusuario: id1,
      activo: "true",
      timeCreated: new Date().toISOString()  // Puedes ajustar cómo se crea la fecha según tus necesidades
    };
    try {
     const response =  await fetch('/api/postchat', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
          body: JSON.stringify({ nuevoChat })
      });
      const data = await response.json(); 
      console.log('ID del chat creado:', data.id);
      return data.id; 
    } catch (error) {
      console.error(error);
    }
  }
}

export const getUsuariosIds = async (remitente,publicacionDeUsuario) => {
  const res = await fetch('/api/getusuarios', { cache: 'no-store' });
  const text = await res.text();
  const retorno = JSON.parse(text);  
  const usuariosPro = [] 
  retorno.forEach(usuario => {
    if (usuario.nombre === remitente) {
        usuariosPro.push({ remitente: usuario.id});
    }
});
retorno.forEach(usuario => {
  if (usuario.nombre === publicacionDeUsuario) {
      usuariosPro.push({ publicacionDeUsuario: usuario.id });
  }
});
  return usuariosPro;
};

export const getLastCallFromUsers = async (id) => {
  const res = await fetch('/api/getservicios', { cache: 'no-store' });
  const text = await res.text();
  const retorno = JSON.parse(text);  
  const postsFromUser = retorno.filter(posteo => posteo.usuario == id);
  return postsFromUser
}

export const getArribosFromUsers = async (id) => {
  const res = await fetch('/api/getarribos', { cache: 'no-store' });
  const text = await res.text();
  const retorno = JSON.parse(text);  
  const postsFromUser = retorno.filter(posteo => posteo.usuario == id);
  return postsFromUser
}