'use client'

const formatLlegada = (llegada) => {
  const llegadaDate = new Date(llegada);
  const fechaActual = new Date();
  const diaActual = fechaActual.getDate();
  const mesActual = fechaActual.getMonth();
  const añoActual = fechaActual.getFullYear();

  const diaLlegada = llegadaDate.getDate();
  const mesLlegada = llegadaDate.getMonth();
  const añoLlegada = llegadaDate.getFullYear();

  if (diaActual === diaLlegada && mesActual === mesLlegada && añoActual === añoLlegada) {
    return `Llega hoy`;
  } else if (fechaActual > llegadaDate) {
    return `Ya llegó`;
  } else {
    const monthNames = [
      "enero", "febrero", "marzo",
      "abril", "mayo", "junio", "julio",
      "agosto", "septiembre", "octubre",
      "noviembre", "diciembre"
    ];
    const month = monthNames[mesLlegada];
    return `${diaLlegada} de ${month}`;
  }
};

export const searchBar = async (query) => {
  try {
    // Fetch para obtener datos de servicios y arribos
    const res = await fetch('/api/searchBar', { cache: 'no-store' });
    const resUsuarios = await fetch('/api/getusuarios', { cache: 'no-store' });
    // Parsear la respuesta a JSON
    const data = await res.json();
    const usuarios = await resUsuarios.json(); // Obtener datos de usuarios

    // Función para obtener el nombre de usuario según el ID
    const getNombreUsuario = (idUsuario) => {
      const usuario = usuarios.find(u => u.id === idUsuario);
      return usuario ? usuario.nombre : idUsuario; // Devuelve el nombre si se encuentra, sino el ID original
    };

    // Filtrar resultados de servicios y arribos según los criterios de búsqueda
    const filteredServicios = data.servicios.map(item => ({
      ...item,
      usuario: getNombreUsuario(item.usuario)
    })).filter(item =>
      item.region.toLowerCase().includes(query.toLowerCase()) ||
      item.bienoservicio.toLowerCase().includes(query.toLowerCase()) ||
      item.zone.toLowerCase().includes(query.toLowerCase()) ||
      item.price.toLowerCase().includes(query.toLowerCase()) ||
      item.usuario.toLowerCase().includes(query.toLowerCase())  
    );

    const filteredArribos = data.arribos.map(item => ({
      ...item,
      usuario: getNombreUsuario(item.usuario),
      formattedLlegada: formatLlegada(item.llegada)
    })).filter(item =>
      item.region.toLowerCase().includes(query.toLowerCase()) ||
      item.salidade.toLowerCase().includes(query.toLowerCase()) ||
      item.zone.toLowerCase().includes(query.toLowerCase()) ||
      item.provincia.toLowerCase().includes(query.toLowerCase()) ||
      item.municipio.toLowerCase().includes(query.toLowerCase()) ||
      item.usuario.toLowerCase().includes(query.toLowerCase()) ||
      item.otherlocation.toLowerCase().includes(query.toLowerCase()) ||
      item.formattedLlegada.toLowerCase().includes(query.toLowerCase())
    );

    

    return { servicios: filteredServicios, arribos: filteredArribos };
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    throw error;
  }
};