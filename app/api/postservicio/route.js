import { NextResponse } from "next/server"
import conn from '../../../lib/db'
import moment from 'moment-timezone' 

export async function POST(request){
    const res = await request.json()

    const postServicio = async (data) => {
        try {         
            const formData = data.formData
            const currentDate = moment().tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');

            formData.timePosteo = currentDate;

            const { servicio, zone, region, timePosteo } = formData;
        
            const query = 'INSERT INTO public.servicio(servicio, zone, region,timePosteo) VALUES ($1, $2, $3, $4)';
            
            const values = [ servicio, zone, region, timePosteo ];

          const result = await conn.query(query, values);
          return result.rows[0];
        } catch (error) {
          throw error;
        }
      };
       
      postServicio(res)
        .then(() => {
          console.log('Inserción exitosa.------------------------------------');
        })
        .catch((error) => {
          console.error('.------------------------------------Error durante la inserción:', error);
        });
 
    return NextResponse.json({data:res}) 
}