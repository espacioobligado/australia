// const lastConnection = async(cookie) => {
//     try {
//       const currentDate = new Date();
  
//       // Verificar si el usuario ya existe en la tabla usuarios
//       const userQuery = 'SELECT id FROM usuarios WHERE nombre = $1';
//       const userResult = await conn.query(userQuery, [cookie]);
  
//       if (userResult.rows.length === 0) {
//         // Si el usuario no existe, insertarlo en la tabla usuarios
//         const insertQuery = 'INSERT INTO usuarios (nombre, lastConnection, timeCreated) VALUES ($1, $2, $3)';
//         const insertValues = [cookie, currentDate, currentDate];
//         await conn.query(insertQuery, insertValues);
//         console.log('Usuario agregado:', cookie);
//       } else {
//         // Si el usuario ya existe, actualizar su última conexión
//         const updateQuery = 'UPDATE usuarios SET lastConnection = $1 WHERE nombre = $2';
//         const updateValues = [currentDate, cookie];
//         await conn.query(updateQuery, updateValues);
//         console.log('Última conexión actualizada para:', cookie);
//       }
//     } catch (error) {
//       console.error('Error al ejecutar la consulta:', error);
//     }
//   }

//   export default lastConnection