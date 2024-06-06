"use client"
import LastCallComponent from '../../components/LastCallComponent/LastCallComponent'
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSearchParams  } from 'next/navigation';
import {mergeData} from '../../../Helpers/LastCallMergeData'
import {scrollToElementRed} from '../../../Helpers/scrollToElementRed';
import {fetchOrCreateUser} from '../../../Helpers/fetchOrCreateUser';
import Dots from '../../components/Dots/dots';

const Lastcall =  () => {       
    const [isMounted, setIsMounted] = useState(false);
    const [cookies, setCookie] = useCookies(['usuario']);
    const searchParams = useSearchParams();
    const [lastValue, setLastValue] = useState();
    const [usuario, setUsuario] = useState('');
    const [servicios, setServicios] = useState([]);
    const [displayServicios, setDisplayServicios] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Nuevo estado para indicar si se están cargando los datos

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
        fetchOrCreateUser(cookies,setUsuario,setCookie);
    }, [cookies.usuario, setCookie]);


    useEffect(() => {                                                
        const fetchGet = async () => {
            const mergedData = await mergeData();
            setServicios(mergedData);
            setIsLoading(false);
        }
        fetchGet()
    },[])
       
    useEffect(() => {
        setDisplayServicios(servicios)
    },[servicios])

    useEffect(() => {
        scrollToElementRed(servicios,lastValue,usuario)
    }, [servicios,lastValue]);

    if (!isMounted) {
        return null;
        }
        else
        {
        return (
                <>
                    {isLoading ? (  
                    <div className="container1">
                        <h1 className="message">
                            Cargando<Dots/>
                        </h1>
                    </div>
                    ) : (
                    displayServicios.length === 0 ? (
                        <div className="container1">
                        <h1 className="message">
                            ¡Anda a Yo Necesito si queres ser el primero!
                        </h1>
                        </div>
                    ) : (
                        <LastCallComponent displayServicios={displayServicios} />
                    )
                )}
                </>
        )
    }
};

export default Lastcall;