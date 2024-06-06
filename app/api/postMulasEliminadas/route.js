import { NextResponse } from "next/server";
import conn from '../../../lib/db';
import moment from 'moment-timezone';

export async function POST(request) {
    const res = await request.json();

    const postXClick = async (data) => {
        try {
            const formData = data.post;
            console.log(formData) 
            console.log(data) 
            
            const currentDate = moment().tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');
            formData.timePosteo = currentDate;

            const { id, region, zone, usuario, llegada, salidade, provincia,municipio,otherlocation,timeposteo} = formData;
            
            const query = 'INSERT INTO public.mulasEliminadas(id, region, zone, usuario, llegada, salidade, provincia,municipio,otherlocation,timeposteo) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10)';
            const values = [id, region, zone, usuario, llegada, salidade, provincia,municipio,otherlocation,timeposteo];
            // console.log(values)

            const result = await conn.query(query, values);
         
            return result.rows[0];
        } catch (error) {
            console.error('Error durante la inserción 2:', error);
            throw error;
        }
    };

    try {
        await postXClick(res);
        console.log('clavado en eliminado')
        return NextResponse.json({ data: res });
    } catch (error) {
        return NextResponse.error(error);
    }
}