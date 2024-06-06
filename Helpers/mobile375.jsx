'use client'
import { useMediaQuery } from 'react-responsive';
export const mobile375 =() =>{
    const mobile375 = useMediaQuery({ query: '(max-width: 375px)' });
    return  mobile375
}