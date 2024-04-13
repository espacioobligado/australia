import conn from '../../lib/db'
   /* const getTables = async () => {
        try {
          const query = `
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_type = 'BASE TABLE' AND table_catalog = 'quienviene';
          `;
          const result = await conn.query(query);
          const tables = result.rows.map(row => row.table_name);
          return tables;
        } catch (error) {
          console.error('Error al obtener las tablas:', error);
          return [];
        }
      };
      
      // Llamada a la función para obtener las tablas
      /*getTables()
        .then(tables => {
          console.log('Tablas encontradas:', tables);
        })
        .catch(error => {
          console.error('Error al obtener las tablas:', error);
        });
        */
      
        /*
        const getMulasData = async () => {
            try {
              const query = 'SELECT * FROM mulas';
              const result = await conn.query(query);
              const mulasData = result.rows;
              return mulasData;
            } catch (error) {
              console.error('Error al obtener los datos de la tabla mulas:', error);
              return [];
            }
          };
          
          // Llamada a la función para obtener los datos de la tabla mulas
          getMulasData()
            .then(mulasData => {
              console.log('Datos de la tabla mulas:', mulasData);
            })
            .catch(error => {
              console.error('Error al obtener los datos de la tabla mulas:', error);
            });
            */
       

const Tasks = {
    getHotData: async function () {
        try {
        const query = 'SELECT * FROM hot';
        const result = await conn.query(query);
        const hotData = result.rows;
        return hotData;
        } catch (error) {
        console.error('Error al obtener los datos de la tabla hot:', error);
        return [];
        }
    },
    
    fetchHotData: async function () {
        try {
        const hotData = await this.getHotData();
        //console.log('Datos de la tabla hot:', hotData);
        return hotData;
        } catch (error) {
        console.error('Error al obtener los datos de la tabla hot:', error);
        return [];
        }
    }
    };
  
    
export default Tasks;