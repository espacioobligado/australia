// 'use client';
// import { createContext, useContext } from 'react';

// const AudioContext = createContext();

// export const useAudio = () => useContext(AudioContext);

// export const AudioProvider = ({ children }) => {
//   const playAudio = () => {
//     const audio = new Audio('/xar.wav'); // Ruta relativa desde la carpeta `public`
//     audio.play();
//   };

//   return (
//     <AudioContext.Provider value={{ playAudio }}>
//       {children}
//     </AudioContext.Provider>
//   );
// };

'use client';
import { createContext, useContext, useState,useEffect } from 'react';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
 
  const [audio, setAudio] = useState(null)

  useEffect(() => {
    const audioInstance = new Audio('/xar.wav');
    setAudio(audioInstance);

    return () => {
      audioInstance.pause();  
      audioInstance.currentTime = 0;  
      setAudio(null); 
    };
  }, [])

  const playAudio = () => {
    if (audio) {
      audio.currentTime = 0; 
      audio.play();
    }
  };

  if (!audio) {
    return null;
  }
  
  return (
    <AudioContext.Provider value={{ playAudio }}>
      {children}
    </AudioContext.Provider>
  );
};