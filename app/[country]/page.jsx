import Arrivos from './Arrivos/Arrivos'
import Lastcall from './Lastcall/Lastcall'


export default async function Country() {

    
    return (
            <main style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
            
                <h2 style={{ color: '#333', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>{escapedCountry}</h2>

                <Arrivos  />

                <Lastcall  />
            </main>

    );
}

//CUANDO CLICKEAS TE LLEVA AL CHAT PARA GESTIONAR CON ELLOS IP Y DEMAS QUE ONDA?