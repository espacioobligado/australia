"use client";

import { io } from "socket.io-client";

// const URL = "http://localhost:3000";
const URL = "quienviene.vercel.app";


export const socket = io(URL, { autoConnect: false },{
    auth:{
        username:''
    }
});
