import { NextResponse } from 'next/server';
import conn from '../../../lib/db';

export async function GET() {
    try {
        const queryServicios = 'SELECT usuario,region,bienoservicio,zone,price FROM servicios';
        const queryArribos = 'SELECT usuario, region, zone, salidade,provincia,municipio,otherlocation,llegada FROM mulas';

        // Ejecutar ambas consultas en paralelo usando Promise.all
        const [resultServicios, resultMulas] = await Promise.all([
            conn.query(queryServicios),
            conn.query(queryArribos),
        ]);

        // Obtener los resultados de ambas consultas
        const servicios = resultServicios.rows;
        const arribos = resultMulas.rows;

        // Combinar los resultados en un objeto JSON
        const combinedResults = {
            servicios: servicios,
            arribos :arribos
        };

        // Devolver la respuesta como JSON usando NextResponse.json
        return NextResponse.json(combinedResults);
    } catch (error) {
        console.error('Error fetching data:', error);
        // En caso de error, devolver una respuesta de error
        return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
    }
}