"use client"
import ArribosComponent from '../../components/ArribosComponent/ArribosComponent'
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useSearchParams  } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import {mergeData} from '../../../Helpers/arribosMergeData'
import {getCurrentDay} from '../../../Helpers/getCurrentDay'
import {scrollToElementBlue} from '../../../Helpers/scrollToElementBlue';
import Dots from '../Dots/Dots';
import crearUsuario from '../../components/usuarios';
import { useSearchBar } from '../../SearchBarContext'; // Importa el contexto
import styles from './ArribosLogicComponent.module.css';

var fechaFormateada = getCurrentDay()

const ArribosLogicComponent = () => { 
  
    const searchParams = useSearchParams();
    const [lastValue, setLastValue] = useState();
    const [cookies, setCookie] = useCookies(['usuario']);
    const [usuario, setUsuario] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [showArrivedOnly, setShowArrivedOnly] = useState(false);
    const [sortByArrival, setSortByArrival] = useState(false);
    const [arribos, setArribos] = useState([]);
    // const [displayArribos, setDisplayArribos] = useState([]);
    const { displayArribos, handleUpdateDisplayArribos } = useSearchBar(); // Usa el contexto
    const [isLoading, setIsLoading] = useState(true);    

    useEffect(() => {
        const getLastValue = () => {
            const valuesArray = Array.from(searchParams.values());
            const lastValue = valuesArray[valuesArray.length - 1];
            setLastValue(lastValue);
        };
        getLastValue();
    }, [searchParams]);
    
    useEffect(() => {
      setIsMounted(true);
    }, []);

    useEffect(() => {
        const fetchMensajes = async () => {
            try {
                const mergedData = await mergeData();
                setArribos(mergedData);
                console.log(mergedData)
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
            }
        };
        fetchMensajes();
    }, []);
    
    useEffect(() => {
        // fetchOrCreateUser(cookies, setUsuario,setCookie);
        const fetchOrCreateUser = async () => {
            try {
                if (!cookies.usuario) {
                    const nuevoUsuario = await crearUsuario();
                    setUsuario(nuevoUsuario);
                    setCookie('usuario', nuevoUsuario, { path: '/' });
                }
                else {
                    setUsuario(cookies.usuario);
                }
            } catch (error) {
                console.error('Error al obtener o crear el usuario:', error);
            }
        };
        fetchOrCreateUser()
    }, [cookies.usuario, setCookie]);
    
    const toggleShowArrivedOnly = () => {
        setShowArrivedOnly(!showArrivedOnly);
        setSortByArrival(false);  
        const filteredArribos = arribos.filter(arribo => arribo.formattedLlegada === 'Ya llego'|| arribo.formattedLlegada === 'Llega hoy');
        console.log(filteredArribos)
        // setDisplayArribos(filteredArribos);
        handleUpdateDisplayArribos(filteredArribos); // Inicializa displayServicios con los datos originales
    };
      
    const toggleSortByArrival = () => {
        console.log('Hola')
        setSortByArrival(prevState => !prevState);
        setShowArrivedOnly(false); 
        const filteredArribos = arribos.filter(arribo => arribo.formattedLlegada !== 'Ya llego' && arribo.formattedLlegada !== 'Llega hoy');
        // setDisplayArribos(filteredArribos);
        handleUpdateDisplayArribos(filteredArribos);
    };

    useEffect(() => {
        // setDisplayArribos(arribos);
        handleUpdateDisplayArribos(arribos);
    }, [arribos]);

    useEffect(() => {
        if (!showArrivedOnly && !sortByArrival) {
            // setDisplayArribos(arribos);
            handleUpdateDisplayArribos(arribos);
        }
    }, [showArrivedOnly, sortByArrival, arribos]);

    useEffect(() => {
        scrollToElementBlue(arribos, lastValue, usuario);
    }, [arribos, lastValue, usuario]);

    if (!isMounted) {
        return null;
    } else {
        return (
            <>
               {isLoading ? (  
                <div className={styles.container2}>
                    <h1 className={styles.messageYoVoy}>
                        Cargando<Dots/> 
                    </h1>
                </div>
            ) : arribos.length === 0 ? (  
                <div className={styles.container2}>
                    <h1 className={styles.messageYoVoy}>
                        ¡Anda a Yo Voy si quieres ser el primero!
                    </h1>
                </div>
            ) : (
                <ArribosComponent
                    displayArribos={displayArribos}
                    toggleSortByArrival={toggleSortByArrival}
                    toggleShowArrivedOnly={toggleShowArrivedOnly}
                    showArrivedOnly={showArrivedOnly}
                    sortByArrival={sortByArrival}
                    fechaFormateada={fechaFormateada}
                />
            )}
            </>
        );
    }
}

export default ArribosLogicComponent;