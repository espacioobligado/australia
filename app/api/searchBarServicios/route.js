import { NextResponse } from 'next/server';
import conn from '../../../lib/db';

export async function GET() {
    try {
        const queryServicios = 'SELECT region,usuario,bienoservicio,zone,price FROM servicios';

        // Ejecutar ambas consultas en paralelo usando Promise.all
        const [resultServicios] = await Promise.all([
            conn.query(queryServicios),
        ]);

        // Obtener los resultados de ambas consultas
        const servicios = resultServicios.rows;

        // Combinar los resultados en un objeto JSON
        const combinedResults = {
            servicios: servicios
        };

        // Devolver la respuesta como JSON usando NextResponse.json
        return NextResponse.json(combinedResults);
    } catch (error) {
        console.error('Error fetching data:', error);
        // En caso de error, devolver una respuesta de error
        return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
    }
}