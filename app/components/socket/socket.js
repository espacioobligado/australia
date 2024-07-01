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
