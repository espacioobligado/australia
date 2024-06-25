// fetchOrCreateUser.js
import crearUsuario from '../usuarios.mjs';

export const fetchOrCreateUser = async (cookies, setCookie, setUsuario) => {
    try {
        if (!cookies.usuario) {
            const nuevoUsuario = await crearUsuario();
            decodeURIComponent(nuevoUsuario);
            setUsuario(nuevoUsuario);
            setCookie('usuario', nuevoUsuario, { path: '/' });
        } else {
            setUsuario(cookies.usuario);
        }
    } catch (error) {
        console.error('Error al obtener o crear el usuario:', error);
    }
};