"use client";

import { io } from "socket.io-client";

// const URL = "http://localhost:3000";
const URL = "https://quienviene.vercel.app";


export const socket = io(URL, {
    autoConnect: false, // Conexión manual
    auth: {
      username: '' // Asegúrate de pasar el nombre de usuario si es necesario
    }
  });

 
// import * as Ably from 'ably';
// import { AblyProvider, useChannel, usePresence } from 'ably/react';


// const client = {
//   key: 'XAw4Vw.IHfvyQ:5pRNv2ZMguWRaVatjRo9I3F0A3m0m-uhPGrLULQYGKI',
//   clientId: 'your-ably-client-id',
// }


// root.render(
//   <AblyProvider client={client}>
//     <App />
//   </AblyProvider>
// )

