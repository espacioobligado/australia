'use client'
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSearchParams } from 'next/navigation';
import { mergeData } from '../../../Helpers/LastCallMergeData';
import { scrollToElementRed } from '../../../Helpers/scrollToElementRed';
import { fetchOrCreateUser } from '../../../Helpers/fetchOrCreateUser';
import Dots from '../Dots/Dots';
// import SearchBarServicios from '../../components/SearchBarServicios/SearchBarServicios';
import LastCallComponent from '../LastCallComponent/LastCallComponent';
import { useSearchBar } from '../../SearchBarContext'; // Importa el contexto
import styles from './LastCallLogicComponent.module.css';

const LastcallLogicComponent = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [cookies, setCookie] = useCookies(['usuario']);
  const searchParams = useSearchParams();
  const [lastValue, setLastValue] = useState();
  const [usuario, setUsuario] = useState('');
  const [servicios, setServicios] = useState([]);
  // const [displayServicios, setDisplayServicios] = useState([]);
  const { displayServicios, handleUpdateDisplayServicios } = useSearchBar(); // Usa el contexto
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
    fetchOrCreateUser(cookies, setUsuario, setCookie);
  }, [cookies.usuario, setCookie]);

  useEffect(() => {
    const fetchGet = async () => {
      const mergedData = await mergeData();
      setServicios(mergedData);
      console.log(mergedData)
      // setDisplayServicios(mergedData); // Inicializa displayServicios con los datos originales
      handleUpdateDisplayServicios(mergedData); // Inicializa displayServicios con los datos originales
      setIsLoading(false);
    };
    fetchGet();
  }, []);

  // const handleUpdateDisplayServicios = (newDisplayServicios) => {
  //   setDisplayServicios(newDisplayServicios); // Actualiza displayServicios con los resultados de la búsqueda
  // };

  useEffect(() => {
    scrollToElementRed(servicios, lastValue, usuario);
  }, [servicios, lastValue]);

  if (!isMounted) {
    return null;
  } else {
    return (
      <>
        {/* <SearchBarServicios onUpdateDisplayServicios={handleUpdateDisplayServicios} /> */}
        {isLoading ? (
          <div className={styles.container1}>
            <h1 className="message">
              Cargando<Dots />
            </h1>
          </div>
        ) : displayServicios.length === 0 ? (
          <div className={styles.container1}>
            <h1 className="message">
              ¡Anda a Yo Necesito si queres ser el primero!
            </h1>
          </div>
        ) : (
          <LastCallComponent displayServicios={displayServicios} />
        )}
      </>
    );
  }
};

export default LastcallLogicComponent;