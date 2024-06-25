'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',marginBottom:'10vh'}}>
    <div style={{textAlign: 'center', border: '1px solid gray', padding: '20px', backgroundColor: 'lightcoral', width: '30vh'}}>
    <h2>Something went wrong!</h2>
      {/* <p style={{color:'red'}}>{error.message}</p> */}
      <button
        onClick={
          // Intentar recuperar volviendo a renderizar el segmento
          () => reset()
        }
      >
        Comunicate con esperanto@gmail.com por favor! Contanos que paso ❤️
      </button>
    </div>
  </div>
  )
}