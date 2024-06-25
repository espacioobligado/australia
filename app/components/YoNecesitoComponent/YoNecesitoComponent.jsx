import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mobile496 } from '../../../Helpers/mobile496';
import ReCAPTCHA from "react-google-recaptcha";
import RegionsForAustralia from '../Zonas/RegionsForAustralia'
import Select from 'react-select'
import styles from './YoNecesitoComponent.module.css';

const YoNecesitoComponent = ({handleInputChange,formData,recaptcha,isLoading,setIsLoading,loadingText,setLoadingText,handleConfirmationServicios,router}) => {
    //traigo datos
    const zonesWithRegions = RegionsForAustralia();
    let isMobile = mobile496(); 
    const regionOptions = [
        { value: '', label: 'Selecciona región' },
        ...zonesWithRegions.map(zone => ({ value: zone.name, label: zone.name }))
    ];
    const zoneOptions = formData.region
    ? zonesWithRegions.find(zone => zone.name === formData.region)?.regions.map(region => ({ value: region, label: region }))
    : [{ value: '', label: 'Selecciona región' }];
       
    return (
        <>
         <div>
                <form onSubmit={(e) => handleConfirmationServicios(isMobile ? e : e, toast, formData, setIsLoading, recaptcha, setLoadingText, router, 'servicios')}>
                    <main style={{  color: '#333', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '10px',alignItems:isMobile ? 'center':'' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: isMobile ? 'auto' : '30vh' }}>
                                {/* <label htmlFor="en" style={{marginTop:'6px',marginRight:isMobile?'10px':'' }}>En</label> */}
                                <Select
                                    id="region"
                                    name="region"
                                    value={formData.region ? { value: formData.region, label: formData.region } : null}
                                    onChange={(selectedOption) => handleInputChange({ target: { name: "region", value: selectedOption ? selectedOption.value : '' } })}
                                    options={regionOptions}
                                    isClearable={true}
                                    placeholder="Selecciona estado"
                                    styles={{ marginBottom: '10px', marginRight: '10px', control: (provided) => ({ ...provided, width: '30vh' }) }}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                        ...theme.colors,
                                          primary: 'red',
                                        },
                                      })}
                                />
                                <Select
                                    id="zone"
                                    name="zone"
                                    value={formData.zone ? { value: formData.zone, label: formData.zone } : null}
                                    onChange={(selectedOption) => handleInputChange({ target: { name: "zone", value: selectedOption ? selectedOption.value : '' } })}
                                    options={zoneOptions}
                                    isClearable={true}
                                    placeholder="Selecciona región"
                                    styles={{ marginBottom: '10px', marginRight: '10px', control: (provided) => ({ ...provided, width: '30vh' }) }}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                        ...theme.colors,
                                          primary: 'red',
                                        },
                                      })}
                                />
                            </div>
                            <div style={{ flexDirection: 'column', alignItems: 'center', gap: '10px',width: isMobile ? 'auto' : '40vh' }}>
                                <div style={{ flexDirection: 'column', alignItems: 'center' ,alignItems:'center',marginTop: '8px'}}>
                                    <div style={{ textAlign:'center',marginBottom:'10px' }}>A necesitar</div>
                                    <div style={{display: 'flex',alignItems: 'center',justifyContent:'center'}}>
                                        <input 
                                        type="text"
                                        id="bienoservicio" 
                                        name="bienoservicio" 
                                        value={formData.bienoservicio} 
                                        onChange={handleInputChange} 
                                        placeholder="Ej. Fernet...Mate...Tabaco..." 
                                        style={{marginTop: '-3px', borderRadius:'5px',border:'1px solid lightgray',padding: '6px', marginRight: '10px'}} 
                                        maxLength={25}
                                        onFocus={(e) => e.target.classList.add('focused')}
                                        onBlur={(e) => e.target.classList.remove('focused')}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: isMobile ? 'auto' : '30vh',marginTop: '8px' }}>
                                <div>
                                    <label style={{ marginRight: '10px' }}>Pago </label>
                                    <input 
                                    type="radio" 
                                    id="marketPrice" 
                                    className={styles["redYo"]}
                                    name="price" 
                                    value="market price" 
                                    checked={formData.price === 'market price'} 
                                    onChange={handleInputChange} 
                                    style={{ 
                                        marginRight: '3px', 
                                        backgroundColor: 'red', // Color de fondo
                                        borderColor: 'red' // Color del borde
                                    }} 
                                    />
                                    <label htmlFor="market price" style={{ marginRight: '10px' }}>Market Price</label>
                                    <input 
                                    type="radio" 
                                    id="fixedPrice" 
                                    className={styles["redYo"]}
                                    name="price" 
                                    value="" 
                                    checked={formData.price !== 'market price'} 
                                    onChange={handleInputChange} 
                                    style={{ marginRight: '3px'}} 
                                    />
                                    <label htmlFor="fixedPrice">Otro</label>

                                    {formData.price !== 'market price' && (
                                        <div style={{ display: 'flex', alignItems: 'center',justifyContent:'center' }}>
                                            <input 
                                            type="text" 
                                            id="price" 
                                            name="price" 
                                            placeholder="Ej. 10 dolis...tatuaje..." 
                                            value={formData.price} 
                                            maxLength={50} 
                                            onChange={handleInputChange} 
                                            style={{ marginTop: '7px', padding: '6px',border:'1px solid lightgray',borderRadius:'5px',width: '225px' }} 
                                            onFocus={(e) => e.target.classList.add('focused')}
                                            onBlur={(e) => e.target.classList.remove('focused')}
                                            />
                                            {/* <p style={{ marginLeft: '5px' }}>dolis</p> */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <ReCAPTCHA
                            id='captcha'
                            style={{ display: 'none',marginTop:'15px' }}
                            ref={recaptcha}
                            sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
                        />
                        <button
                            disabled={isLoading}
                            style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
                            // backgroundColor: 'blue', color: 'white'
                            onMouseOver={() => { // Función para cambiar el color de fondo cuando el cursor está sobre el botón
                                if (!isLoading) {
                                    event.target.style.color = 'red'; // Cambia a azul cuando no está cargando
                                }
                            }}
                            onMouseOut={() => { // Función para restaurar el color de fondo cuando el cursor sale del botón
                                event.target.style.color = isLoading ? '#ccc' : 'black'; // Restaura el color original
                            }}
                        >
                            {isLoading ? loadingText : 'Confirmar'}
                        </button>
                        <ToastContainer />
                    </main>
                </form>
        </div>

        </>
    )
}

export default YoNecesitoComponent