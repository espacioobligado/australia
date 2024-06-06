let fechaActual = new Date();
var dia = fechaActual.getDate();
var mesActual = fechaActual.getMonth();
var añoActual = fechaActual.getFullYear();

const traeArribos = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/getarribos', { cache: 'no-store' });
        const retorno = await res.json(); 
        return retorno;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        throw error;  
    }
};

const getusuarios = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/getusuarios', { cache: 'no-store' });
        const retorno = await res.json();   
        return retorno;
    } catch (error) {
        console.error('Error al realizar la solicitud getusuarios:', error);
        throw error;  
    }
};

export const mergeData = async () => {
    try {
        const arrivos = await traeArribos();
        const usuarios = await getusuarios();

        const mergedData = {};
        arrivos.forEach(arrivo => {
            const nombre = usuarios.find(usuario => usuario.id === arrivo.usuario)?.nombre;
            const arrivoCopy = { ...arrivo };
            delete arrivoCopy.usuario;
            delete arrivoCopy.espacio;
            if (nombre) {
                mergedData[arrivo.id] = { ...arrivoCopy, nombre };
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

        return mergedDataArray;
    } catch (error) {
        console.error('Error merging data:', error);
        throw error;
    }
};