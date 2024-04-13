import conn from '../../../lib/db';
import Link from 'next/link';

const getNecesitoData = async () => {
      const query = 'SELECT * FROM servicio';
                                               
      const result = await conn.query(query);
      const necesitoData = result.rows;  
      let array = [];
      let usuarios = [];
      let coordenadas = [];
      let money = [];

      for (let i = 0; i < necesitoData.length; i++) {
        const bienOservicio = `${necesitoData[i].bienoservicio}`;  
        const usuario = `${necesitoData[i].usuario}`;
        const zonaregionada = `${necesitoData[i].region}`; //${necesitoData[i].zone}, 
        const moneyomarket = `${necesitoData[i].money} `;
        //const llega = `${necesitoData[i].llega} `;
  
        array.push(bienOservicio);     
        usuarios.push(usuario);     
        coordenadas.push(zonaregionada);  
        money.push(moneyomarket); 
      }

       return { array, usuarios, coordenadas,money}; //arrayLlega
    };

// //HACER CARDS ESTETICAMENTE LINDAS||||||||||||||||||||||||||||
const  YoNecesito = async () => {                                             

  const necesitoData  = await getNecesitoData();
  const arrayNecesito = necesitoData.array
  const usuarios = necesitoData.usuarios
  const coordenadas = necesitoData.coordenadas
  const money = necesitoData.money.map(p => {
    const parsed = parseInt(p, 10);
    return isNaN(parsed) ? 'market price' : `${parsed}$`;
  });

  //console.log(arrayMoneyNecesito)
        
    return (
            <>
                {/*---------<h3 style={{ textAlign: 'center',padding: '10px' }}>Queres llevar algo?</h3>------------*/}
                <h1><i className="fas fa-plane-departure"></i>Last Call</h1>
                <div style={{ display: 'flex'}}>
                    <div style={{ flex: '1', marginRight: '5vh' }}>
                        <h3 style={{ color: '#f0f0f0' }}>En</h3>
                        {coordenadas.map((p, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    <li style={{ fontStyle: 'italic', color: '#555' }}>{p}</li>
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div style={{ flex: '1', marginRight: '5vh' }}>
                        <h3 style={{ color: '#f0f0f0' }}>usuario</h3>
                        {usuarios.map((mula, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    <Link href={`/chat/${mula}`}>
                                        <li style={{ fontStyle: 'italic', color: 'red', cursor: 'pointer' }}>{mula}</li>
                                    </Link>
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div style={{ flex: '1', marginRight: '5vh' }}>
                        <h3 style={{ color: '#333' }}>Necesita</h3>
                        {arrayNecesito.map((p, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    <li style={{ fontStyle: 'italic', color: '#555' }}>{p}</li>
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div style={{ flex: '1', marginRight: '5vh' }}>
                        <h3 style={{ color: '#333' }}>?</h3>
                        {money.map((p, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    <li style={{ fontStyle: 'italic', color: '#555' }}>
                                     {p}  
                                    </li>
                                </ul>
                            </div>
                        ))}                                
                    </div>
                </div>
            </>
    )
};

export default YoNecesito;
