import { NextResponse } from "next/server";
import conn from '../../../lib/db';
import moment from 'moment-timezone';

export async function DELETE(request) {
    const res = await request.json();
    const deleteXClick = async (data) => {
        try {
            const id = data.post.id;
            // const query = 'INSERT INTO public.serviciosEliminados(id, region, zone, usuario, bienoservicio, price, timePosteo) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        //    const query = 'Delete from public.servicios where "id" = VALUES ($1)';
           const query = 'DELETE FROM public.servicios WHERE "id" = $1';
            
            const result = await conn.query(query, [id]);

            return result.rows[0];
        } catch (error) {
            console.error('Error durante la inserción 2:', error);
            throw error;
        }
    };

    try {
        await deleteXClick(res);
        return NextResponse.json({ data: res });
    } catch (error) {
        return NextResponse.error(error);
    }
}