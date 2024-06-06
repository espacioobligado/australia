"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import crearUsuario from '../../components/usuarios';
import { useCookies } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { handleConfirmationServicios } from '../../../Handlers/handleConfirmationServicios';
import YoNecesitoComponent from "../../components/YoNecesitoComponent/YoNecesitoComponent";

const Yonecesito = () => {
    const recaptcha = useRef();
    const [cookies, setCookie] = useCookies();
    const [usuario, setUsuario] = useState();  
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('Cargando...'); 
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const fetchOrCreateUser = async () => {
            try {
                if (!cookies.usuario) {
                    const nuevoUsuario = await crearUsuario();
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
        if (!isMounted) {
            return;
        }

        setFormData(prevFormData => ({
            ...prevFormData,
            usuario: usuario
        }));
    }, [usuario, isMounted]);

    const router = useRouter();

    const [formData, setFormData] = useState({
        usuario: usuario,
        bienoservicio: '',
        zone: '',
        region: '',
        price: 'market price'
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        if (value !== formData[name]) {
            if (name === 'region') {
                setFormData({ ...formData, [name]: value, zone: null });  
            } else {
                setFormData({ ...formData, [name]: value });
            }
        }
    };
 
    if (!isMounted) {
        return null;
    } else {
        return (
            <>
                <YoNecesitoComponent
                    handleInputChange={handleInputChange}
                    formData={formData}
                    recaptcha={recaptcha}
                    isLoading={isLoading}
                    loadingText={loadingText}
                    setIsLoading={setIsLoading}
                    setLoadingText={setLoadingText}
                    handleConfirmationServicios={handleConfirmationServicios}
                    router={router}
                />
            </>
        );
    }
};

export default Yonecesito;