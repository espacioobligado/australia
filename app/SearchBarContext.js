'use client'
// ServiciosContext.js
import { createContext, useContext, useState } from 'react';

const SearchBarContext = createContext();

export const useSearchBar = () => useContext(SearchBarContext);

export const SearchBarProvider = ({ children }) => {
  const [displayServicios, setDisplayServicios] = useState([]);
  const [displayArribos, setDisplayArribos] = useState([]);

  const handleUpdateDisplayServicios = (newDisplayServicios) => {
    setDisplayServicios(newDisplayServicios);
  };

  const handleUpdateDisplayArribos = (newDisplayArribos) => {
    setDisplayArribos(newDisplayArribos);
  };

  return (
    <SearchBarContext.Provider 
      value={{ 
        displayServicios, 
        handleUpdateDisplayServicios, 
        displayArribos, 
        handleUpdateDisplayArribos 
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
};
