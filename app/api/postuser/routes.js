import { NextResponse } from "next/server";
import conn from '../../../lib/db';
import moment from 'moment-timezone';

{/*export async function POST(request) {
    try {
        const { usuario } = await request.json(); // Obtener el nombre de usuario del cuerpo de la solicitud
        const currentDate = moment().tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');
        const query = 'INSERT INTO public.users(name,timecreation) VALUES ($1, $2)';
        const values = [usuario, currentDate];
        await conn.query(query, values); // Crear el usuario si no existe
        console.log('Usuario creado o actualizado con éxito.');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error durante la creación o actualización del usuario:', error);
        return NextResponse.error(error);
    }
}*/}

export async function POST(request) {
    const res = await request.json();
    console.log(3)

    const postUser = async (data) => {
        try {
            const formData = data.formData;
            const currentDate = moment().tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');

            formData.timecreation = currentDate;

            const { name,  timecreation } = formData;

            const query = 'INSERT INTO public.users(name,timecreation) VALUES ($1, $2)';
            const values = [name,  timecreation];

            const result = await conn.query(query, values);

            console.log('Inserción exitosa usuarial.');
            //return result.rows[0];
        } catch (error) {
            console.error('Error durante la inserción44444:', error);
            throw error;
        }
    };

    try {
        await postUser(res);
        console.log(4)
        console.log('Redirección exitosa.');
        return NextResponse.json({ data: res });
    } catch (error) {
        return NextResponse.error(error);
    }
}

//la cookie funciona en firefox , no en edge, y el psoteo tampcoo, no llega a la api, comparar con los otros a ver el error , zzZ
//si envia mensj, se guarda usuario en base de datos con historial de conversacion