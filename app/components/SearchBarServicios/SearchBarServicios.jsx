import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBarServicios.module.css'; // Importa estilos personalizados
import { searchBarServicios } from '../../../Helpers/searchBarServicios'; // Importa la función searchBar desde tu helper

const SearchBarServicios = ({ onUpdateDisplayServicios }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      if (query.trim() !== '') {
        const response = await searchBarServicios(query); // Llama al helper searchBar con el query
        setResults(response.servicios); // Actualiza los resultados con la respuesta obtenida
        // console.log(response.servicios)
        onUpdateDisplayServicios(response.servicios); // Llama a la función onUpdateDisplayServicios en Lastcall
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]); // Limpia los resultados en caso de error
      onUpdateDisplayServicios([]); // Limpia displayServicios en Lastcall en caso de error
    }
  };

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
        <button onClick={handleSearch} className={styles.searchButton}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        </button>
      </div>
    </div>
  );
};

export default SearchBarServicios;