const getservicios = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/getservicios', { cache: 'no-store' });
      const text = await res.text();
      const retorno = JSON.parse(text);    
      return retorno;
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      throw error;  
    }
  };

const getusuarios = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/getusuarios', { cache: 'no-store' });
      const text = await res.text();
      const retorno = JSON.parse(text);   
       return retorno;
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      throw error;  
    }
  };
   
export const mergeData = async () => {
    try {
        const servicios = await getservicios()
        const usuarios = await getusuarios()

        const mergedData = {};
        servicios.forEach(servicio => {
            const nombre = usuarios.find(usuario => usuario.id === servicio.usuario)?.nombre;
            const servicioCopy = { ...servicio };
            delete servicioCopy.usuario;
            // delete servicioCopy.espacio;
            if (nombre) {
                mergedData[servicioCopy.id] = { ...servicioCopy, usuario:nombre };
            }
        });

        const mergedDataArray = Object.values(mergedData);
        mergedDataArray.sort((a, b) => new Date(a.timeposteo) - new Date(b.timeposteo));

        mergedDataArray.forEach(obj => {
            delete obj.timeposteo; // Remove the timeposteo property from obj
        });

        return mergedDataArray;
    } catch (error) {
        console.error('Error merging data:', error);
        throw error;
    }
};