"use client"                                     
import { useEffect, useState } from "react"; 
import { ToastContainer, toast } from 'react-toastify';
import {getMensajesDe,getMensajes,getChatsFrom,getUsuariosRemitentes,getUsuarioId,getLastCallFromUsers,getArribosFromUsers} from '../../../Helpers/Chats'
import {handleSaveChangesLastCall} from '../../../Handlers/handleSaveChangesLastCall'

let fechaActual = new Date();
var dia = fechaActual.getDate();
var mesActual = fechaActual.getMonth();
var añoActual = fechaActual.getFullYear();

const PosteosDelUsuario = ({userIdPublicador,   isMobile}) => {
    const [posteosDelUsuarioArribos, setPosteosDelUsuarioArribos] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [posteosDelUsuarioLastCall, setPosteosDelUsuarioLastCall] = useState(null);
    const [postSeleccionado, setPostSeleccionado] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [formData, setFormData] = useState({
        id:'',
        bienoservicio: '',
        price: ''
    });

    useEffect(() => {
        setIsMounted(true);
      }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };
    
    const handlePostClick = (index,post) => {
        setPostSeleccionado(index);
        setFormData({})
        formData.id = post.id
    };
    
    const handleXClick = async (post) => {
        //alerta mas linda?
        if(confirm('Queres eliminar tu posteo?')){
    //arribos tambien puede eliminarse? falta recaptcha 
        toast.error(`Espera mientras se elimina`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });  
        const postServicio2 = async (post) => {
            // generatedId
            console.log(post)
            try {
                const response = await fetch('/api/postServiciosEliminados', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify({ post })
                });
                if (response.ok) {
                    console.log('ok')
                    const response2 = await fetch('/api/deleteServicio', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                          },
                        body: JSON.stringify({ post })
                        // , id: generatedId
                    });
                    if (response2.ok) {
                        
                        window.location.reload()
                    }
                } else {
                    throw new Error('La solicitud POST falló');
                }
            } catch (error) {
                console.error(error);
            }
        }
        await postServicio2(post)
        }
        setPostSeleccionado(false)
    }

    const handleXClickBlue = async (post) => {
        //alerta mas linda?
        if(confirm('Queres eliminar tu posteo?')){
    //arribos tambien puede eliminarse? falta recaptcha 
        toast.info(`Espera mientras se elimina`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });  
        const postMulas2 = async (post) => {
            try {
                const response = await fetch('/api/postMulasEliminadas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify({ post })
                });
                if (response.ok) {
                    console.log('ok')
                    const response2 = await fetch('/api/deleteMulas', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                          },
                        body: JSON.stringify({ post })
                    });
                    if (response2.ok) {
                        window.location.reload()
                    }
                } else {
                    throw new Error('La solicitud POST falló');
                }
            } catch (error) {
                console.error(error);
            }
        }
        await postMulas2(post)
        }
    }

    useEffect(() => {
        const fetchUserPosts = async () => {
            const posteosLastCall = await getLastCallFromUsers(userIdPublicador)
            const posteosArribos = await getArribosFromUsers(userIdPublicador)
            if(posteosLastCall.length !== 0)
                {
                    setPosteosDelUsuarioLastCall(posteosLastCall)
                }
            if(posteosArribos.length !== 0)
                {
                    posteosArribos.forEach(obj => {
                        const llegadaDate = new Date(obj.llegada);
                        var diaLlegada = llegadaDate.getDate();
                        var mesLlegada = llegadaDate.getMonth();
                        var añoLlegada = llegadaDate.getFullYear();
                        
                      if (dia === diaLlegada && mesActual === mesLlegada && añoActual === añoLlegada ) 
                        {
                            obj.formattedLlegada = `Llega hoy`;
                        } else if (fechaActual > llegadaDate)
                        {
                            obj.formattedLlegada = `Ya llego`;
                        }
                        else 
                        {
                            const day = llegadaDate.getDate();  
                            const monthIndex = llegadaDate.getMonth(); 
                            const monthNames = [
                                "enero", "febrero", "marzo",
                                "abril", "mayo", "junio", "julio",
                                "agosto", "septiembre", "octubre",
                                "noviembre", "diciembre"
                            ];
                            const month = monthNames[monthIndex];  
                            obj.formattedLlegada = `${day} de ${month}`;
                            delete obj.timeposteo;  
                        }
                    });
                    setPosteosDelUsuarioArribos(posteosArribos)
            }
            setIsLoading(false);
        }
        fetchUserPosts()
    },[userIdPublicador])

    if (!isMounted) {
        return null;
    } else {
    return (
        <>
            <ToastContainer/>
            <h1 style={{ marginBottom: '10px',textAlign:'center' }}>aca veras tus posteos y podras modificarlos</h1>
            <div style={{ display: 'flex',  flexDirection: 'row', flexWrap: 'wrap',alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',alignItems: 'center',justifyContent:'center' }}>
                {posteosDelUsuarioLastCall ? (
                    posteosDelUsuarioLastCall.map((post, index) => (
                            <div key={post.id}>
                            {postSeleccionado === index ? (
                              <div  style={{ marginBottom: '10px', marginRight:'10px',marginLeft:'10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', width: isMobile?'30vh':'30vh', height:isMobile?'27vh':'22vh'}}>
                                <div style={{ color: 'red', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button onClick={() => handleXClick(post)}> X</button>
                                </div>
                                <div style={{ display: 'flex', height: '5vh',wordWrap: 'break-word' }}>
                                    <strong>Región</strong>&nbsp; {post.region}, {post.zone}
                                </div>
                                <div style={{ display: 'flex', height: '5vh'}}>
                                    <strong>Necesita:</strong>
                                    <div style={{ alignItems: 'center' }}>
                                    <input
                                        id={`${index}-bienoservicio`}
                                        name='bienoservicio'
                                        type="text"
                                        value={postSeleccionado.bienoservicio}
                                        onChange={handleInputChange}
                                        placeholder={post.bienoservicio}
                                        style={{ width: '19vh',wordWrap: 'break-word'  }}
                                        maxLength={40}
                                        onFocus={(e) => e.target.classList.add('focused')}
                                        onBlur={(e) => e.target.classList.remove('focused')}
                                    />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', height: '5vh'}}> 
                                    <div style={{ alignItems: 'center' }}>
                                        <strong>Por:</strong>
                                        <input
                                            id={`${index}-price`}
                                            name='price'
                                            type="text"
                                            value={postSeleccionado.price}
                                            onChange={handleInputChange}
                                            placeholder={post.price}
                                            style={{ width: '24vh',wordWrap: 'break-word'  }}
                                            maxLength={40}
                                            onFocus={(e) => e.target.classList.add('focused')}
                                            onBlur={(e) => e.target.classList.remove('focused')}
                                        />
                                    </div>
                                </div>
                                <div style={{ height: '1vh' ,textAlign:'center'}}>
                                    <button style={{ color: '#FF0033' }} onClick={(e) => handleSaveChangesLastCall(toast,index, post, e,formData,posteosDelUsuarioLastCall,postSeleccionado,setPostSeleccionado,setPosteosDelUsuarioLastCall)}>Guardar cambios</button>
                                </div>
                            </div>
                            ) : (
                                <div style={{ marginBottom: '10px', marginRight:'10px',marginLeft:'10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', width: isMobile?'30vh':'30vh', height:isMobile?'27vh':'22vh'}}>
                                    <div style={{ color: 'red', display: 'flex', justifyContent: 'flex-end' }}>
                                        <button onClick={() => handleXClick(post)}> X</button>
                                    </div>
                                    <div style={{ display: 'flex', height: '5vh' }}>
                                        <strong>Región</strong>&nbsp; {post.region}, {post.zone}
                                    </div>
                                    <div style={{ display: 'flex', height: '5vh',wordWrap: 'break-word' }}>
                                        <strong>Necesita</strong>&nbsp;<div>{post.bienoservicio}</div>
                                    </div>
                                    <div style={{ display: 'flex', height: '5vh', wordWrap: 'break-word' }}>
                                        <strong>Por</strong>&nbsp;<div>{post.price}</div>
                                    </div>
                                    <div style={{ height: '3vh', justifyContent: 'center', display: 'flex', alignItems: 'center',marginBottom:'10px' }}>
                                        <button style={{ color: 'red' }} onClick={(e) => handlePostClick(index, post)}>Editar</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p></p>
                    // No hiciste ningun posteo
                )}
            </div>
            </div>

            <div style={{ display: 'flex',  flexDirection: 'row', flexWrap: 'wrap',alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',alignItems: 'center',justifyContent:'center' }}>
                        {posteosDelUsuarioArribos ? (
                            posteosDelUsuarioArribos.map((post, index) => (
                                    <div key={post.id}>
                                    {/*  style={{backgroundColor:'lightgray'}} */}
                                        <div style={{marginBottom: '10px',  alignItems: 'center',marginRight:'10px',marginLeft:'10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px 10px 15px',  width: isMobile?'40vh':'45vh'}}>
                                        {/* height:isMobile?'15vh':'10vh' */}
                                            <div style={{ color: '#007bff',  display: 'flex', justifyContent: 'flex-end' }}>
                                                <button onClick={() => handleXClickBlue(post)}> X</button>
                                            </div>
                                            <div style={{ height: '5vh',textAlign:'center' }}>
                                                <strong>Vas a </strong>&nbsp; {post.region}, {post.zone} el {post.formattedLlegada}
                                            </div>
                                        </div>
                                    </div>
                            ))
                            ) : (
                            <p></p>
                            // No hiciste ningun posteo
                        )}
                    </div>
            </div>
        </>
    )
}
}

export default PosteosDelUsuario