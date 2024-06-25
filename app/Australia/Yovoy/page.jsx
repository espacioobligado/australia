"use client";

import { useState, useEffect, useRef  } from "react";
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import YoVoyComponent from '../../components/YoVoyComponent/YoVoyComponent'
import RegionsForArgentina from '../../components/Zonas/RegionsForArgentina'
import crearUsuario from '../../components/usuarios'
import {handleConfirmationMulas} from '../../../Handlers/handleConfirmationMulas'
import Select from 'react-select'
import { useAudio } from '../../AudioContext';

const Yovoy = () => { 
    const { playAudio } = useAudio(); // Usa el contexto
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [cookies, setCookie] = useCookies(['usuario']);
    const [usuario, setUsuario] = useState(cookies.usuario || '');  
    const [formData, setFormData] = useState({
        usuario:usuario,
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
    const [loadingText, setLoadingText] = useState('Cargando...');   
    const recaptcha = useRef()
    useEffect(() => {
        setIsMounted(true);                            
        const fetchOrCreateUser = async () => {
            try {
                if (!cookies.usuario) {
                    const nuevoUsuario = await crearUsuario();
                    decodeURIComponent(nuevoUsuario);
                    setUsuario(nuevoUsuario);
                    setCookie('usuario', nuevoUsuario, { path: '/' });
                } else {
                    setUsuario(cookies.usuario);
                }
            } catch (error) {
                console.error('Error al obtener o crear el usuario:', error);
            }
        };
    
        fetchOrCreateUser();
    }, [cookies.usuario, setCookie]);

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            usuario: usuario
        }));
    }, [usuario]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        if (value !== formData[name]) {
            if (name === 'provincia') {
                setFormData({ ...formData, [name]: value, municipio: '' });
            }
            else if (name === 'region') {
                setFormData({ ...formData, [name]: value, zone: '' });  
            }
            else {
                setFormData({ ...formData, [name]: value });
            }
        }
    };
      
    const regionsForArgentina = RegionsForArgentina()
    const renderCities = () => {
        if (formData.provincia && regionsForArgentina[formData.provincia]) {
            return (
                <div>
                    {/* <select id="municipio" name="municipio" value={formData.municipio} onChange={handleInputChange} style={{ marginBottom: '10px',marginTop:'7px'}}>
                        <option value="">Seleccione municipio</option>
                        {regionsForArgentina[formData.provincia].map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select> */}
                    <Select
                        id="municipio"
                        name="municipio"
                        value={formData.municipio ? { value: formData.municipio, label: formData.municipio } : null}
                        onChange={(selectedOption) => handleInputChange({ target: { name: "municipio", value: selectedOption ? selectedOption.value : '' } })}
                        options={regionsForArgentina[formData.provincia]?.map((city, index) => ({ value: city, label: city })) || []}
                        isClearable={true}
                        placeholder="Seleccione municipio"
                        styles={{ marginBottom: '10px', marginTop: '7px', control: (provided) => ({ ...provided, width: '28vh' }) }}
                        />
                </div>
            );
        }
    };

    if (!isMounted) {
        return null;
    }
    else
    {
    return (
            <>
                <YoVoyComponent 
                playAudio={playAudio}
                handleInputChange={handleInputChange}
                formData={formData}
                renderCities={renderCities}
                recaptcha={recaptcha}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                loadingText={loadingText}
                setLoadingText={setLoadingText}
                confirmationMessage={confirmationMessage}
                handleConfirmationMulas={handleConfirmationMulas}
                router={router}
                />
            </>
            )
    }
}
export default Yovoy;