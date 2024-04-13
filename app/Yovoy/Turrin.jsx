"use client";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import RegionsForAustralia from './RegionsForAustralia'

const Turrin = () => {
    const [formData, setFormData] = useState({
        servicio:'',
        zone: '',
        region: ''
    });
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    //FALTA AGREGAR PROVINCIA Y MUNICIPIO
    function handleConfirmation(e) {
        try{
            fetch('/api/postservicio', { 
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
        }

        if (formData.servicio&&formData.zone && formData.region ) {
            let departureLocation = formData.selectedReturn === 'Otro' ? formData.otherLocation : formData.selectedReturn;
            const confirmationMessage = `Necesitas ${formData.servicio} en ${formData.zone}  ${formData.region}.`;
            alert(confirmationMessage);
        } else {
            alert("Por favor seleccione todas las opciones antes de confirmar.");
        }
    }
    
    const zonesWithRegions = RegionsForAustralia()
 
      return ( //caambiar estilo turrin que sea igual a yovoy
        <form>
            <main style={{ padding: '20px', color: '#333', display: 'flex',  display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <p>Yo necesito</p>
                    <input type="text" id="servicio" name="servicio" value={formData.servicio} onChange={handleInputChange} placeholder="                  Ej. Fernet" style={{ marginTop: '5px', marginRight: '10px' }} maxLength={25}/>
                <select id="zone" name="zone" value={formData.zone} onChange={handleInputChange} style={{  marginBottom: '10px', marginRight: '10px' }}>
                    <option value="">En</option>
                    {zonesWithRegions.map(zone => (
                        <option key={zone.name} value={zone.name}>{zone.name}</option>
                    ))}
                </select>
                <select id="region" name="region" value={formData.region} onChange={handleInputChange} style={{ marginBottom: '10px', marginRight: '10px' }}>
                    <option value="">Seleccione una región</option>
                    {formData.zone && zonesWithRegions.find(zone => zone.name === formData.zone)?.regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>

            <button onClick={handleConfirmation}   style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Enviar pedido</button>
            </main>
        </form>
    );
}

export default Turrin; 