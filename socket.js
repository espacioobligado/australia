"use client";
import crearUsuario from '../components/usuarios';
import { io } from "socket.io-client";


// const getUsername = async () => {

/*    if (typeof window !== 'undefined') {
        const username = localStorage.getItem('usuario')
        if(username){
          console.log('user existe' + username)
        }
    }

const res = await crearUsuario();
  return res
}*/

// console.log('----------------------')
//  console.log(username)


// const URL = "http://localhost:3000";
const URL = "https://quienviene.vercel.app:3000";

export const socket = io(URL, { autoConnect: false });


// export const socket = io(URL, { autoConnect: false },{
//     auth:{
//         username: crearUsuario(),
//         serverOffset:0,
//     }
// });
