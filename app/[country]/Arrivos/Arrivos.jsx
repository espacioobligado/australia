import conn from '../../../lib/db';
import Link from 'next/link';
import Image from 'next/image';

const getMulasData = async (country) => {
      const query = 'SELECT * FROM mulas';
                                              //separado
      const result = await conn.query(query);
      const mulasData = result.rows;  
  
      let array = [];
      let arrayzone = [];
      let arrayLlegada = [];
      let arrayEspacio = [];
      for (let i = 0; i < mulasData.length; i++) {
        const fullNameAndAddress = `${mulasData[i].name} de ${mulasData[i].provincia}  ${mulasData[i].municipio}`;
        const zone = `${mulasData[i].zone} `;
        const llega = `${mulasData[i].llegada} `;
        const espacio = `${mulasData[i].espacio}`;

        array.push(fullNameAndAddress);     
        arrayzone.push(zone);     
        arrayLlegada.push(llega); 
        arrayEspacio.push(espacio); 
      }
      const formattedDates = arrayLlegada.map(dateString => {
        const fecha = new Date(dateString);
        const options = { day: 'numeric', month: 'long' };
        return fecha.toLocaleDateString('es-ES', options);
    });

       return { array, arrayzone, formattedDates,arrayEspacio};
    };

    

// //HACER CARDS ESTETICAMENTE LINDAS||||||||||||||||||||||||||||
const  YoVoy = async () => { 

        const mulasData = await getMulasData();
        const array = mulasData.array
        const arrayzone = mulasData.arrayzone
        const arrayLlegada = mulasData.formattedDates
        const arrayEspacio = mulasData.arrayEspacio
        //console.log(arrayEspacio)  si es x x si es o bolso s ies a iphone si es c carton
        //ordenar el listing mas centrado , margen a los costados
        //luego chat mode
        return (
            <>
                <h1><i className="fas fa-plane-departure"></i>Arrivos</h1>
                <div style={{ display: 'flex', borderBottom: '2px solid red', paddingBottom: '10px' }}>
                    <div style={{ flex: '30%', marginRight: '10px' }}>
                        <h3 style={{ color: '#f0f0f0' }}>En</h3>
                        {arrayzone.map((p, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    <li style={{ fontStyle: 'italic', color: '#555' }}>{p}</li>
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div style={{ flex: '50%', marginRight: '10px' }}>
                        <h3 style={{ color: '#333' }}>Viene</h3>
                        {array.map((mula, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    <Link href={`/chat/${mula}`}>
                                        <li style={{ fontStyle: 'italic', color: '#007bff', cursor: 'pointer' }}>{mula}</li>
                                    </Link>
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div style={{ flex: '10%', marginRight: '10px' }}>
                        <h3 style={{ color: '#333' }}>Llega</h3>
                        {arrayLlegada.map((mula, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    <li style={{ fontStyle: 'italic', color: '#555', cursor: 'pointer' }}>{mula}</li>
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div style={{ flex: '10%', marginRight: '10px' }}>
                        <h3 style={{ color: '#333' }}>Espacio</h3>
                        {arrayEspacio ? (
                            arrayEspacio.map((item, index) => (
                                <div key={index}>
                                    {item == 'x' ? (
                                         <ul style={{ listStyleType: 'none', padding: 0 }}>
                                         <li style={{ fontStyle: 'italic', color: '#555', cursor: 'pointer', marginBottom: '10px' }}>
                                             {item}
                                         </li>
                                     </ul>
                                    ) : (
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Image src="wepa.svg" alt="Imagen" width={25} height={30} />
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : null}
                    </div>
                </div>
            </>
    )
};

export default YoVoy;
