import { NextResponse } from "next/server"
import conn from '../../../lib/db'
import moment from 'moment-timezone' 

export async function POST(request){
    const res = await request.json()

    const postDataMulas = async (data) => {
        try {         
            const formData = data.formData
            const currentDate = moment().tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');

            formData.timePosteo = currentDate;

            const { name, region, zone, llegada, salidaDe, provincia, municipio, otherLocation, timePosteo } = formData;
        
            const query = 'INSERT INTO public.mulas(name, region, zone, llegada, salidaDe, provincia, municipio, otherLocation, timePosteo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
            
            const values = [name, region, zone, llegada, salidaDe, provincia, municipio, otherLocation, timePosteo];

          const result = await conn.query(query, values);
          return result.rows[0];
        } catch (error) {
          throw error;
        }
      };
       
      postDataMulas(res)
        .then(() => {
          console.log('Inserción exitosa.------------------------------------');
        })
        .catch((error) => {
          console.error('.------------------------------------Error durante la inserción:', error);
        });
 
    return NextResponse.json({data:res}) 
}