'use client'
import { useEffect } from 'react';
import { useSearchBar } from '../SearchBarContext'; // Importa el contexto
import ArribosLogicComponent from '../components/ArribosLogicComponent/ArribosLogicComponent'
import LastCallLogicComponent from '../components/LastCallLogicComponent/LastCallLogicComponent'

export default function Australia() {
  const { displayArribos, displayServicios, handleUpdateDisplayArribos, handleUpdateDisplayServicios } = useSearchBar(); // Usa el contexto
  // Registrar el Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')  //  Registering a service worker
          .then(registration => {
            console.log('Service Worker registrado:', registration);
          })
          .catch(error => {
            console.error('Error al registrar el Service Worker:', error);
          });
      });
    }
  }, []);

  // Actualizar displayArribos

  return (
    <>
     {displayArribos !== undefined && displayArribos && <ArribosLogicComponent />}
     {displayServicios !== undefined && displayServicios && <LastCallLogicComponent />} 
    </>
  );
}
