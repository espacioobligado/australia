let fechaActual = new Date();
var dia = fechaActual.getDate();
var mesActual = fechaActual.getMonth();
var añoActual = fechaActual.getFullYear();

const traeArribos = async () => {
    try {
        const res = await fetch('/api/getarribos', { cache: 'no-store' });
        const retorno = await res.json(); 
        return retorno;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        throw error;  
    }
};

const getusuarios = async () => {
    try {
        const res = await fetch('/api/getusuarios', { cache: 'no-store' });
        const retorno = await res.json();   
        return retorno;
    } catch (error) {
        console.error('Error al realizar la solicitud getusuarios:', error);
        throw error;  
    }
};

export const mergeData = async () => {
    try {
        const arribos = await traeArribos();
        const usuarios = await getusuarios();

        const mergedData = {};
        arribos.forEach(arribo => {
            const nombre = usuarios.find(usuario => usuario.id === arribo.usuario)?.nombre;
            const arriboCopy = { ...arribo };
            delete arriboCopy.usuario;
            delete arriboCopy.espacio;
            if (nombre) {
                mergedData[arribo.id] = { ...arriboCopy, usuario:nombre };
            }
        });
         
        const mergedDataArray = Object.values(mergedData);
        mergedDataArray.sort((a, b) => new Date(a.timeposteo) - new Date(b.timeposteo));

        mergedDataArray.forEach(obj => {
            const llegadaDate = new Date(obj.llegada);
            var diaLlegada = llegadaDate.getDate();
            var mesLlegada = llegadaDate.getMonth();
            var añoLlegada = llegadaDate.getFullYear();
            
          if (dia === diaLlegada && mesActual === mesLlegada && añoActual === añoLlegada ) 
            {
                obj.formattedLlegada = `Llega hoy`;
            } else if (fechaActual > llegadaDate)
            {
                obj.formattedLlegada = `Ya llego`;
            }
            else 
            {
                const day = llegadaDate.getDate();  
                const monthIndex = llegadaDate.getMonth(); 
                const monthNames = [
                    "enero", "febrero", "marzo",
                    "abril", "mayo", "junio", "julio",
                    "agosto", "septiembre", "octubre",
                    "noviembre", "diciembre"
                ];
                const month = monthNames[monthIndex];  
                obj.formattedLlegada = `${day} de ${month}`;
                delete obj.timeposteo;  
            }
        });
        console.log(mergedDataArray)
        return mergedDataArray;
    } catch (error) {
        console.error('Error merging data:', error);
        throw error;
    }
};