'use client'
import { useEffect } from 'react';

export default function Australia () {
    //inicia el service worker, firebox ok edge no | chrome?
    //imprime service-worker.js

    
    useEffect(() => {
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')  //  Registering a service worker
              .then(registration => {
                console.log('Service Worker registrado:', registration)   
              })
              .catch(error => {
                console.error('Error al registrar el Service Worker:', error);
              });
          });
        }
      }, []); 


    return  
}