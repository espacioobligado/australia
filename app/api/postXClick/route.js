import { NextResponse } from "next/server";
import conn from '../../../lib/db';
import moment from 'moment-timezone';

export async function POST(request) {
    const res = await request.json();

    const postXClick = async (data) => {
        try {
            const formData = data.formData;
            // console.log(formData) 
            
            const currentDate = moment().tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');
            formData.timePosteo = currentDate;

            const { bienoservicio, zone, usuario, region, timePosteo, price } = formData;
            const id = data.id
            let userId;

            const checkUserQuery = 'SELECT id FROM usuarios WHERE nombre = $1';
            const checkUserResult = await conn.query(checkUserQuery, [usuario]);

            if (checkUserResult.rows.length === 0) {
                // Si el usuario no existe, insertarlo en la tabla usuarios
                const insertUserQuery = 'INSERT INTO usuarios (nombre, lastConnection, timeCreated) VALUES ($1, $2, $3)';
                const insertUserValues = [usuario, currentDate, currentDate];
                const insertUserResult = await conn.query(insertUserQuery, insertUserValues);
                
                if (insertUserResult.rowCount > 0) {
                    console.log('Usuario agregado:', usuario);
                    // Recuperar el ID del usuario insertado
                    const insertedUserIdQuery = 'SELECT id FROM usuarios WHERE nombre = $1';
                    const insertedUserIdResult = await conn.query(insertedUserIdQuery, [usuario]);
                    
                    userId = insertedUserIdResult.rows[0].id;
                } else {
                    console.error('Error al insertar el usuario:', insertUserResult);
                }
            } else {
                userId = checkUserResult.rows[0].id;
            }
            const query = 'INSERT INTO public.serviciosEliminados(id,region, usuario, bienoservicio, zone, price, timePosteo) VALUES ($1, $2, $3, $4, $5, $6, $7)';
            const values = [id,region, userId, bienoservicio, zone, price, timePosteo];
            // console.log(values)

            const result = await conn.query(query, values);
         
            console.log('Inserción exitosa servicio.');
            return result.rows[0];
        } catch (error) {
            console.error('Error durante la inserción 2:', error);
            throw error;
        }
    };

    try {
        await postServicio(res);
        console.log('Redirección exitosa.');
        return NextResponse.json({ data: res });
    } catch (error) {
        return NextResponse.error(error);
    }
}