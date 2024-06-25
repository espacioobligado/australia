import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatArribosAzul from '../Chat/ChatArribosAzul/ChatArribosAzul'
import { mobile496 } from '../../../Helpers/mobile496';
import { mobile427 } from '../../../Helpers/mobile427';

const ArribosComponent = ({ displayArribos, toggleSortByArrival, toggleShowArrivedOnly,showArrivedOnly,sortByArrival,fechaFormateada }) => {
    
    const isMobile = mobile496()
    const isMobile427 = mobile427(); 

    return (
        <>
            {isMobile ? (
                <div style={{ marginLeft: '20px', marginRight: '20px', marginBottom: '5px'}}>
                    <div style={{marginBottom: '15px'}}>
                        {isMobile427 ? ( 
                        <>
                            <div style={{display:'flex'}}>
                                <p style={{color: '#007bff', marginRight:'10px'}}>Habla con l@s que vienen!</p>
                                <input type="checkbox" checked={sortByArrival} onChange={toggleSortByArrival} />
                            </div>
                            <div style={{display:'flex',justifyContent: 'flex-end'}}>
                                <input type="checkbox" checked={showArrivedOnly} onChange={toggleShowArrivedOnly} />
                                <p style={{color: 'black', textAlign: 'right',marginLeft:'10px'}}>😄 Hoy {fechaFormateada}</p>
                            </div>  
                        </> 
                        ):(
                        <div style={{display: 'flex'}}>
                                <p style={{color: '#007bff', marginRight: '1px'}}>Habla con l@s que vienen!</p>
                                <input style={{marginRight:'10px'}} type="checkbox" checked={sortByArrival} onChange={toggleSortByArrival} />
                                <input type="checkbox" checked={showArrivedOnly} onChange={toggleShowArrivedOnly} />
                            <p style={{color: 'black'}}>😄 Hoy {fechaFormateada}</p>
                        </div>
                        )}
                    </div> 
                    {/* <ToastContainer /> */}
                    {displayArribos.map((displayArribo, index) => (
                        <div key={index} id={index} style={{ textAlign:'center',backgroundColor:'lightgreen',marginBottom: '20px', border: '1px solid #ccc', borderRadius: '15px' , padding: '10px' }}>
                            <div>
                                <p style={{ marginRight: '0.2em' }}>
                                    <strong style={{ marginRight: '0.2em' }}>{displayArribo.region}, {displayArribo.zone}</strong>
                                    {displayArribo.formattedLlegada === 'Ya llego' ? 'llegó' : 'viene'}
                                </p> 
                                <ChatArribosAzul key={displayArribo.usuario} value={displayArribo.usuario}/>   
                            </div>
                            <div>
                                <p style={{ marginRight: '0.2em' }}>de <strong>
                                     </strong>
                                     {displayArribo.otherlocation ? displayArribo.otherlocation : 
                                    (displayArribo.municipio === "") ? 
                                    `${displayArribo.salidade}${displayArribo.provincia ? `, ${displayArribo.provincia}` : ""}` : 
                                    displayArribo.provincia === "" ? 
                                    displayArribo.salidade :
                                    `${displayArribo.provincia ? `${displayArribo.provincia}, ` : ""}${displayArribo.municipio}`}
                                </p>
                                {displayArribo.formattedLlegada === 'Ya llego' ? null : (
                                    <p>
                                        {displayArribo .formattedLlegada === 'Llega hoy' ? 'hoy' : `el ${displayArribo.formattedLlegada}`}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                ):(
                <div>
                    {/* <ToastContainer /> */}
                    <div style={{ marginLeft: '20px', marginRight: '20px', marginBottom: '5px'}} >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'20px', marginTop:'15px'}}>
                            <div style={{ width:'20vh' }}>
                                <h1><i className="fas fa-plane-departure"></i>Arribos</h1> 
                            </div>
                            <div style={{display:'flex',width:'60vh',justifyContent:'center'}}>
                                <p style={{color: '#007bff',  marginRight: '10px'}}>Habla con l@s que vienen!</p>
                                <input type="checkbox" checked={sortByArrival} onChange={toggleSortByArrival} />
                            </div>
                            <div style={{display:'flex',width:'20vh'}}>
                                <input style={{ marginRight: '10px'}}type="checkbox" checked={showArrivedOnly} onChange={toggleShowArrivedOnly} />
                                <h2>Hoy {fechaFormateada} &#128512;</h2>
                            </div>
                        </div>
                        <div style={{ display: 'flex', paddingBottom: '10px', alignItems: 'stretch'}}>
                            <div style={{ flex: '25%', marginRight: '10px' }}>
                                <h3 style={{ color: '#007bff' }}>.</h3>
                            </div>
                            <div style={{ flex: '25%', marginRight: '10px', color: '#333' }}>
                                <h3 style={{ color: '#333' }}>Viene</h3>
                            </div>
                            <div style={{ flex: '35%', marginRight: '10px' }}>
                                <h3 style={{ color: '#333' }}>De</h3>
                            </div>
                            <div style={{ flex: '15%', marginRight: '10px' }}>
                                <h3 style={{ color: '#333' }}>Llega</h3>
                            </div>
                        </div> 
                    </div>
                    {displayArribos.map((displayArribo, index) => (
                        <div key={`region1-${index}`} id={index} style={{marginLeft: '20px', marginBottom: '20px',display:'flex',color: '#555'}}>
                            <div  key={`region1-${index}`} style={{flex: '25%'}}>{displayArribo.region}, {displayArribo.zone} </div> 
                            <div  key={`region2-${index}`} style={{flex: '25%'}}><ChatArribosAzul key={displayArribo.usuario} value={displayArribo.usuario}/></div> 
                            {/* <div  key={`region3-${index}`} style={{flex: '25%'}}>{displayArribo.otherlocation ? displayArribo.otherlocation : `${displayArribo.municipio}, ${displayArribo.provincia}`} </div> */}
                            <div key={`region3-${index}`} style={{ flex: '35%' }}>
                            {/* {displayArribo.otherlocation ? displayArribo.otherlocation : (displayArribo.municipio === "" && displayArribo.provincia === "") ? displayArribo.salidade : `${displayArribo.municipio}, ${displayArribo.provincia}`} */}
                            {displayArribo.otherlocation ? displayArribo.otherlocation : 
                                (displayArribo.municipio === "") ? 
                                `${displayArribo.salidade}${displayArribo.provincia ? `, ${displayArribo.provincia}` : ""}` : 
                                displayArribo.provincia === "" ? 
                                displayArribo.salidade :
                                `${displayArribo.provincia ? `${displayArribo.provincia}, ` : ""}${displayArribo.municipio}`}
                            </div>
                            <div style={{flex: '15%'}}>
                            {displayArribo.formattedLlegada === 'Ya llego' ? 'Ya llego' : (
                                    <div>{displayArribo .formattedLlegada === 'Llega hoy' ? 'hoy' : `el ${displayArribo.formattedLlegada}`} </div>
                                )}
                            </div>
                        </div>  
                    ))}       
                </div>
            )}
        </>
    )
}
export default ArribosComponent 