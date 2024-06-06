"use client"
import ArribosComponent from '../../components/ArribosComponent/ArribosComponent'
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useSearchParams  } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import {mergeData} from '../../../Helpers/arribosMergeData'
import {getCurrentDay} from '../../../Helpers/getCurrentDay'
import {scrollToElementBlue} from '../../../Helpers/scrollToElementBlue';
import {fetchOrCreateUser} from '../../../Helpers/fetchOrCreateUser';
import Dots from '../../components/Dots/dots';

var fechaFormateada = getCurrentDay()

const Arribos = () => { 
  
    const searchParams = useSearchParams();
    const [lastValue, setLastValue] = useState();
    const [cookies, setCookie] = useCookies(['usuario']);
    const [usuario, setUsuario] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [showArrivedOnly, setShowArrivedOnly] = useState(false);
    const [sortByArrival, setSortByArrival] = useState(false);
    const [arribos, setArribos] = useState([]);
    const [displayArribos, setDisplayArribos] = useState([]);
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
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
            }
        };
        fetchMensajes();
    }, []);
    
    useEffect(() => {
        fetchOrCreateUser(cookies, setUsuario,setCookie);
    }, [cookies.usuario, setCookie]);
    
    const toggleShowArrivedOnly = () => {
        setShowArrivedOnly(!showArrivedOnly);
        setSortByArrival(false);  
        const filteredArribos = arribos.filter(arribo => arribo.formattedLlegada === 'Ya llego'|| arribo.formattedLlegada === 'Llega hoy');
        console.log(filteredArribos)
        setDisplayArribos(filteredArribos);
    };
      
    const toggleSortByArrival = () => {
        console.log('Hola')
        setSortByArrival(prevState => !prevState);
        setShowArrivedOnly(false); 
        const filteredArribos = arribos.filter(arribo => arribo.formattedLlegada !== 'Ya llego' && arribo.formattedLlegada !== 'Llega hoy');
        setDisplayArribos(filteredArribos);
    };

    useEffect(() => {
        setDisplayArribos(arribos);
    }, [arribos]);

    useEffect(() => {
        if (!showArrivedOnly && !sortByArrival) {
            setDisplayArribos(arribos);
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
                <div className="container2 shadow-animation">
                    <h1 className="messageYoVoy">
                        Cargando<Dots/> 
                    </h1>
                </div>
            ) : arribos.length === 0 ? (  
                <div className="container2 shadow-animation">
                    <h1 className="messageYoVoy">
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

export default Arribos;
                                //hacer componentes de las rutas en si, las rutas muestran esos componentes. Escala Abstraccion. Sino es un chino entender todo :D MSUICAAA
//TRUCO
// const [isMounted, setIsMounted] = useState(false);

// useEffect(() => {
//   setIsMounted(true);
// }, []);

// if (!isMounted) {
//   return null;
// }

//pero quita la optimizacion de next, justamente ssr y asi no, haria mas lento la carga. Dejarlo y fijar a la larga otro modo...