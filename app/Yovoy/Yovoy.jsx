"use client";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';

import RegionsForArgentina from './RegionsForArgentina'
import ZonesForArgentina from './ZonesForArgentina'
import RegionsForAustralia from './RegionsForAustralia'


const Magolla = () => { //QUE NO ELIMINE ALGO SI FALTA DECLARAR ALGO NO NULLL PLEEES

    const [formData, setFormData] = useState({
        name:'tigre dorado',
        region: '',
        zone: '',
        llegada: '',
        salidaDe: 'Argentina',
        provincia: '',
        municipio:'',
        otherLocation: '',
        espacio:'x'
    });
    
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);  
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    
    function handleConfirmation(e) {
        setIsLoading(true); 
        try{
            fetch('/api/postmulas', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                formData 
            })
        })
        }catch(e){
             console.error(e)
             setConfirmationMessage('Hubo un error al enviar la confirmación.');

        } finally {
             setIsLoading(false);  
        }
        
        if (formData.region && formData.zone && formData.llegada && (formData.salidaDe || formData.salidaDeAustralia)) {
            let departureLocation = formData.salidaDe === 'Otro' ? formData.otherLocation : formData.salidaDe;
            const confirmationMessage = `Has seleccionado la región ${formData.zone} de la zona ${formData.region} de Australia, la fecha ${formData.llegada} y sales de ${departureLocation}.`;
            alert(confirmationMessage)
            
        } else {
        alert("Por favor seleccione todas las opciones antes de confirmar.");
        }
    }
 
 

    const renderCities = () => {
        if (formData.provincia && regionsForArgentina[formData.provincia]) {
            return (
                <div>
                    <select id="municipio" name="municipio" value={formData.municipio} onChange={handleInputChange} style={{ marginBottom: '10px',marginTop:'7px'}}>
                        <option value="">Seleccione municipio</option>
                        {regionsForArgentina[formData.provincia].map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
            );
        }
    };
    
    const zonesWithRegions = RegionsForAustralia()
    const zonesForArgentina = ZonesForArgentina()
    const regionsForArgentina = RegionsForArgentina()

      return (
        <form onSubmit={handleConfirmation}>
            <main style={{ backgroundColor: '#f0f0f0', padding: '20px', color: '#333', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <select id="region" name="region" value={formData.region} onChange={handleInputChange} style={{ marginBottom: '10px' }}>
                            <option value="">A</option>
                            {zonesWithRegions.map(zone => (
                                <option key={zone.name} value={zone.name}>{zone.name}</option>
                            ))}
                        </select>
                        <select id="zone" name="zone" value={formData.zone} onChange={handleInputChange} style={{ marginBottom: '10px' }}>
                            <option value="">Seleccione una región</option>
                            {formData.region && zonesWithRegions.find(zone => zone.name === formData.region)?.regions.map(region => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <label htmlFor="llegada" style={{ marginBottom: '5px' }}>Fecha</label>
                        <input type="date" id="llegada" name="llegada" value={formData.llegada} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start',width:'45vh'   }}>
                        <div>
                            <label >Salgo de  </label>
                            <label style={{ marginRight: '10px' }}>
                                <input
                                    type="radio"
                                    name="salidaDe"
                                    value="Argentina"
                                    checked={!formData.salidaDe || formData.salidaDe === "Argentina"}
                                    onChange={handleInputChange}
                                    
                                />
                                Argentina
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="salidaDe"
                                    value="Otro"
                                    checked={formData.salidaDe === "Otro"}
                                    onChange={handleInputChange}
                                />
                                Otro
                            </label>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '20px'}}>
                            {formData.salidaDe === 'Argentina' && (
                                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start' }}>
                                    <select id="provincia" name="provincia" value={formData.provincia} onChange={handleInputChange} style={{ marginBottom: '10px', marginTop:"7px" }}>
                                        <option value="">Seleccione provincia</option>
                                        {zonesForArgentina.map(zone => (
                                            <option key={zone} value={zone}>{zone}</option>
                                        ))}
                                    </select>
                                    {renderCities()}
                                </div>
                            )}
                            {formData.salidaDe === 'Otro' && (
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: '5px'}}>
                                <label htmlFor="otherLocation" style={{ marginTop:'5px', marginRight: '10px' }}>lugar de salida</label>
                                <input type="text" id="otherLocation" name="otherLocation" value={formData.otherLocation} onChange={handleInputChange} placeholder="Ej. Manly" style={{ marginTop: '5px' }} />
                            </div>
                            )}
                        </div>
                    </div>
                </div>
                <button disabled={isLoading} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>
                    {isLoading ? 'Cargando...' : 'Confirmar'}
                </button>
                {confirmationMessage && <p>{confirmationMessage}</p>}
            </main>
        </form>
    );
}

export default Magolla;