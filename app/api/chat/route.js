// app/api/chat/route.js

import { conn } from '../../../database'; // Asegúrate de importar tu conexión a la base de datos correctamente

export default async function lastConnection(req, res) {
  const { cookie } = req.body; // Asumo que obtienes el valor de cookie desde el cuerpo de la solicitud
  
  try {
    const currentDate = new Date();

    // Verificar si el usuario ya existe en la tabla usuarios
    const userQuery = 'SELECT id FROM usuarios WHERE nombre = $1';
    const userResult = await conn.query(userQuery, [cookie]);

    if (userResult.rows.length === 0) {
      // Si el usuario no existe, insertarlo en la tabla usuarios
      const insertQuery = 'INSERT INTO usuarios (nombre, lastConnection, timeCreated) VALUES ($1, $2, $3)';
      const insertValues = [cookie, currentDate, currentDate];
      await conn.query(insertQuery, insertValues);
      console.log('Usuario agregado:', cookie);
    } else {
      // Si el usuario ya existe, actualizar su última conexión
      const updateQuery = 'UPDATE usuarios SET lastConnection = $1 WHERE nombre = $2';
      const updateValues = [currentDate, cookie];
      await conn.query(updateQuery, updateValues);
      console.log('Última conexión actualizada para:', cookie);
    }

    // Envía una respuesta exitosa
    res.status(200).json({ message: 'Última conexión actualizada correctamente' });
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    // Envía una respuesta de error
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
