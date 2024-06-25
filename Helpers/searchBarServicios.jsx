'use client'
export const searchBarServicios = async (query) => {
  try {
    const res = await fetch('http://localhost:3000/api/searchBarServicios', { cache: 'no-store' });
    const resUsuarios = await fetch('http://localhost:3000/api/getusuarios', { cache: 'no-store' });

    const data = await res.json();
    const usuarios = await resUsuarios.json(); // Obtener datos de usuarios

    const getNombreUsuario = (idUsuario) => {
      const usuario = usuarios.find(u => u.id === idUsuario);
      return usuario ? usuario.nombre : idUsuario; // Devuelve el nombre si se encuentra, sino el ID original
    };

    // Filtrar resultados de servicios y arribos según los criterios de búsqueda
    const filteredServicios = data.servicios.map(item => ({
      ...item,
      nombre: getNombreUsuario(item.usuario)
    })).filter(item => 
      item.region.toLowerCase().includes(query.toLowerCase()) ||
      item.bienoservicio.toLowerCase().includes(query.toLowerCase()) ||
      item.zone.toLowerCase().includes(query.toLowerCase()) ||
      item.price.toLowerCase().includes(query.toLowerCase()) 
    );

    return { servicios: filteredServicios };
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    throw error;
  }
};