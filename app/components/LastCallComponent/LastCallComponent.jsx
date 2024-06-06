import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatLastcallRojo from '../Chat/ChatLastcallRojo/ChatLastcallRojo'
import { mobile496 } from '../../../Helpers/mobile496';
import 'react-toastify/dist/ReactToastify.css';

const LastCallComponent = ({ displayServicios  }) => {
    
    const isMobile = mobile496(); 

    return (
        <>
        {/* ¿PORQUE NO ESTA CENTRADO? */}
            {isMobile ? (
                <>
                    <div style={{display: 'flex', marginLeft: '20px', marginRight: '20px', marginBottom: '5px', }}>
                        <div style={{justifyContent:'flex-start'}}><i className="fas fa-plane-departure"></i>Last Call</div>
                        <div style={{ marginLeft: '35px', color: 'red'}}>Coordina con ell@s! </div>
                    </div>
                    {/* <ToastContainer /> */}
                    {displayServicios.map((servicio, index) => (
                        <div key={index} id={index} style={{ textAlign: 'center', backgroundColor: 'darkgray', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '15px', padding: '10px' }}>
                            <p key={`region-${index}`}>{servicio.region}, {servicio.zone}</p>
                            <ChatLastcallRojo key={`nombre-${index}`} value={servicio.nombre} />
                            <p key={`bienoservicio-${index}`}>{servicio.bienoservicio}</p>
                            {/* <strong>necesita</strong>  */}
                            <p key={`price-${index}`}>{servicio.price}</p> 
                            {/* <strong>por </strong>  */}
                        </div>
                    ))}
                </>
                ) : (
                    <>
                        <div style={{minHeight:'100vh' }}>
                        {/* <ToastContainer /> */}
                        <div style={{ marginLeft: '20px', marginRight: '20px', marginBottom: '5px'}}>
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px', marginTop: '15px' }}>
                                    <div>
                                        <h1><i className="fas fa-plane-departure"></i>Last Call</h1>
                                    </div>
                                    <div style={{ flexGrow: 1 }}>
                                        <p style={{ color: 'red', textAlign: 'center' }}>Coordina con ell@s!</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'stretch' }}>
                                    <div style={{ flex: '25%', marginRight: '10px' }}>
                                            <h3 style={{ color: 'red' }}>.</h3>
                                </div>
                                <div style={{ flex: '25%', marginRight: '10px' }}>
                                    <span>❤️</span>  
                                </div>
                                <div style={{ flex: '25%', marginRight: '10px' }}>
                                    <h3 style={{ color: ''}}>Necesita</h3>
                                </div>
                                {/* <div style={{ flex: '25%', marginRight: '10px',cursor: 'help' }}>
                                    <span style={{ color: 'red'}}>&#9981; </span> 
                                    <span style={{ color: 'black' }}>(
                                    <span style={{ color: 'red' }}>nafta</span>
                                    )</span>
                                </div> */}
                                <div style={{ flex: '25%', marginRight: '10px',cursor: 'help' }}>
                                    <span>A</span>
                                </div>
                            </div> 
                        </div>
                        {displayServicios.map((servicio, index) => (
                            <div key={index} id={index} style={{ marginLeft: '20px',marginBottom: '20px',display:'flex',color: '#555'}}>
                                <div key={`region-${index}`}style={{flex: '25%'}}>{servicio.region}, {servicio.zone}</div>
                                <div key={`nombre-${index}-${index}`} style={{flex: '25%'}}><ChatLastcallRojo key={`nombre2-${index}`} value={servicio.nombre} /></div>
                                <div key={`bienoservicio-${index}`} style={{flex: '25%'}}>{servicio.bienoservicio}</div>
                                <div key={`price-${index}`} style={{flex: '25%'}}>{servicio.price}</div>
                            </div>
                        ))}
                        </div>
                    </>
                )
            }
        </>
    )
}

export default LastCallComponent 