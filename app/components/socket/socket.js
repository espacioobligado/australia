"use client";

import { io } from "socket.io-client";

// const URL = "http://localhost:3000";
const URL = "https://quienviene.vercel.app:443";


export const socket = io(URL, { autoConnect: false },{
    auth:{
        username:''
    }
});
