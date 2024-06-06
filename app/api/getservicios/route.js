import { NextResponse } from 'next/server';
import conn from '../../../lib/db';

 export async function GET() {
     const query = 'SELECT * FROM servicios'
     const result = await conn.query(query);
     const rersult2 = result.rows
     return NextResponse.json( rersult2 ) 
} 

// export function GET (necesitoData,necesitoData2)  {
//     if  (typeof necesitoData !== undefined){
                                                 
//         let array = [];
//         let usuarios = [];
//         let coordenadas = [];
//         let money = [];
//         for (let i = 0; i < necesitoData.length; i++) {
//             const bienOservicio = necesitoData[i].bienoservicio;
//             let nombre = null; // Inicializa el nombre como null por defecto
        
//             // Busca el nombre correspondiente en necesitoData2
//             for (let j = 0; j < necesitoData2.length; j++) {
//                 if (necesitoData[i].usuario === necesitoData2[j].id) {
//                     nombre = necesitoData2[j].nombre;
//                     break; // Sal del bucle interno si encuentra una coincidencia
//                 }
//             }

//             const zonaregionada = `${necesitoData[i].region}`; 
//             const moneyomarket = necesitoData[i].price === 'marketPrice' ? 'market price' : necesitoData[i].price;
            
//             array.push(bienOservicio);     
//             usuarios.push(nombre);     
//             coordenadas.push(zonaregionada);  
//             money.push(moneyomarket); 
//         }
//          console.log('retorno',retorno)
//         return { array, usuarios, coordenadas,money};  
//     }
//     else   {
//         console.log('entre a  undefined')
//     }
// };