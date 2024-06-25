'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBar.module.css'; // Importa estilos personalizados
import { searchBar } from '../../../Helpers/searchBar'; // Importa la función searchBar desde tu helper

const SearchBar = ( {onUpdateDisplayServicios,onUpdateDisplayArribos}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ servicios: [], arribos: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query.trim() !== '') {
          const response = await searchBar(query); // Llama al helper searchBar con el query
          setResults(response); // Actualiza los resultados con la respuesta obtenida
          console.log(response)
          onUpdateDisplayServicios(response.servicios)
          onUpdateDisplayArribos(response.arribos)
          setQuery('')
        } else {
          setResults({ servicios: [], arribos: [] }); // Limpia los resultados si no hay query
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setResults({ servicios: [], arribos: [] }); // En caso de error, limpia los resultados
      }
    };

    fetchData(); // Llama a fetchData cuando query cambie
  }, [query]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Blue label..."
          className={styles.searchInput}
        />
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      </div>
    </div>
  );
};

export default SearchBar;