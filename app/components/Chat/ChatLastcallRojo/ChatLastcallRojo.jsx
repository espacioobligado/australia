"use client"
const ChatLastcallRojo = (usuarios) => {
    let usuario1  = usuarios.value
    return (
            <>
                <p> 
                    <a  style={{ color: 'red'}}   href={`/Australia/Chat/with/${usuario1}`} id={`id${usuario1}${usuario1}`}>{usuario1}</a>
                </p>  
            </>
            )
}

export default ChatLastcallRojo;