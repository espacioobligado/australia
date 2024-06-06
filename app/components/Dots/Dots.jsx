'use client'
import { useEffect, useState } from "react";

const Dots = () => {
    const [dots, setDots] = useState('.');
    
    useEffect(() => {
    const interval = setInterval(() => {
        setDots(prevDots => {
        if (prevDots === '...') return '.';
        else return prevDots + '.';
        });
    }, 500);
  
      return () => clearInterval(interval);
    }, []);

    return (
        <>{dots}</>
    )
}

export default Dots;