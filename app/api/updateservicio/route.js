import { NextResponse } from "next/server";
import conn from '../../../lib/db';
import moment from 'moment-timezone';

export async function PUT(request) {
    const res = await request.json();
    const updateServicio = async (data) => {
        try {
            const formData = data.formData;
            // console.log(formData) 
            const currentDate = moment().tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');
            formData.timePosteo = currentDate;

            const { id, bienoservicio, price } = formData;
            const query = 'UPDATE public.servicios SET bienoservicio = $2, price = $3 WHERE id = $1';
            const values = [id, bienoservicio, price];
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
        await updateServicio(res);
        console.log('updateServicio');
        return NextResponse.json({ data: res });
    } catch (error) {
        return NextResponse.error(error);
    }
}