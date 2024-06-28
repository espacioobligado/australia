import { NextResponse } from "next/server"
import conn from '../../../lib/db'
import moment from 'moment-timezone' 
import { revalidatePath } from 'next/cache';

export async function POST(request){
    const res = await request.json()
    const postDataMulas = async (data) => {
      try {
          const formData = data.formData;
          const currentDate = moment().tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');
          formData.timePosteo = currentDate;
  
          const { usuario, region, zone, llegada, salidaDe, provincia, municipio, otherLocation, timePosteo } = formData;
          let id = data.id;
          let userId;
          // Verificar si el usuario ya existe en la base de datos
          const checkUserQuery = 'SELECT id FROM usuarios WHERE nombre = $1';
          const checkUserResult = await conn.query(checkUserQuery, [usuario]);

          if (checkUserResult.rows.length === 0) {
              // Si el usuario no existe, insertarlo en la tabla usuarios
              const insertUserQuery = 'INSERT INTO usuarios (nombre, lastConnection, timeCreated) VALUES ($1, $2, $3) RETURNING id';
              const insertUserValues = [usuario, currentDate, currentDate];
              const insertUserResult = await conn.query(insertUserQuery, insertUserValues);
              console.log('Usuario agregado:', usuario);
              userId = insertUserResult.rows[0].id;
          }else{
            userId = checkUserResult.rows[0].id;
          }
          // Insertar los datos en la tabla mulas
          const insertMulasQuery = 'INSERT INTO public.mulas(id,usuario, region, zone, llegada, salidaDe, provincia, municipio, otherLocation, timePosteo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
          const insertMulasValues = [id,userId, region, zone, llegada, salidaDe, provincia, municipio, otherLocation, timePosteo];
          await conn.query(insertMulasQuery, insertMulasValues);
          
          console.log('insertMulasValues',insertMulasValues);
          console.log('Inserción exitosa mulas.');
          await revalidatePath('/api/getarribos');
          //return res.rows[0];
      } catch (error) {
          console.error('Error durante la inserción333:', error);
          throw error;
      }
  };
       
      try {
        await postDataMulas(res);
        return NextResponse.json({ data: res });
    } catch (error) {
        return NextResponse.error(error);
    }
}