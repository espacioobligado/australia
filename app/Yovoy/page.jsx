import Magolla from './Yovoy';
import Turrin from './Turrin';


export default async function Yovoy  ()  {
    return (
        <>
            <Magolla />  
                <p style={{  borderTop: '2px solid black' }}> </p>
                <p style={{ textAlign: 'center'  , marginTop:'20px'}}>Si necesitas que te traigan algo</p>
            <Turrin/>
        </>
    );
}