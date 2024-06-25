import {getUsuariosIdDelChat} from './Chats'

export const llamar = async (publicacionDeUsuario) => {
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
            return mensaje
          } catch (error) {
            console.error('Error al obtener getusuarios:', error);
        }
};