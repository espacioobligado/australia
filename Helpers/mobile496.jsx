'use client'
import { useMediaQuery } from 'react-responsive';

export const mobile496 =() =>{
    const mobile496 = useMediaQuery({ query: '(max-width: 496px)' });

    return  mobile496  
}