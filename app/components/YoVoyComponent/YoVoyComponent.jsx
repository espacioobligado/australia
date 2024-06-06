import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegionsForAustralia from '../../components/Zonas/RegionsForAustralia'
import ZonesForArgentina from '../../components/Zonas/ZonesForArgentina'
import {maxDate} from '../../../Helpers/maxDate'
import { mobile496 } from '../../../Helpers/mobile496';
import {getCurrentDate} from '../../../Helpers/getCurrentDate'
import ReCAPTCHA from "react-google-recaptcha";
import Select from 'react-select'
import styles from '../../styles/styles.module.css';

const YoVoyComponent = ({handleInputChange,formData,renderCities,recaptcha,isLoading,setIsLoading,loadingText,setLoadingText,confirmationMessage,handleConfirmationMulas,router}) => {
    //traigo datos
    const zonesWithRegions = RegionsForAustralia()
    const zonesForArgentina = ZonesForArgentina()
    const maxDate1 = maxDate()
    const getCurrentDate1 = getCurrentDate()
    let isMobile = mobile496(); 

    const regionOptions = [
        { value: '', label: 'Selecciona estado' },
        ...zonesWithRegions.map(zone => ({ value: zone.name, label: zone.name }))
      ];
      
      const zoneOptions = formData.region
        ? zonesWithRegions.find(zone => zone.name === formData.region)?.regions.map(region => ({ value: region, label: region }))
        : [{ value: '', label: 'Selecciona región' }];

        const provinciaOptions = [
            { value: '', label: 'Seleccione provincia' },
            ...zonesForArgentina.map(zone => ({ value: zone, label: zone }))
          ];

        return (
        <div style={{ minHeight: '100vh' }}>
            <form onSubmit={(e) => handleConfirmationMulas(e, toast, formData, setIsLoading, recaptcha, setLoadingText, router,'mulas')}>
            <main style={{ color: '#333', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems:'center', width: isMobile ? 'auto' : '30vh' }}>
                    {/* <label htmlFor="a" style={{marginTop:'6px',marginRight:isMobile?'10px':'' }}>A</label> */}
                         <Select
                            id="region"
                            name="region"
                            value={formData.region ? { value: formData.region, label: formData.region } : null}
                            onChange={(selectedOption) => handleInputChange({ target: { name: "region", value: selectedOption ? selectedOption.value : '' } })}
                            options={regionOptions}
                            isClearable={true}
                            placeholder="Selecciona estado"
                            styles={{ marginBottom: '12px', control: (provided) => ({ ...provided, width: '30vh' }) }}
                        />
                        <Select
                            id="zone"
                            name="zone"
                            value={formData.zone ? { value: formData.zone, label: formData.zone } : null}
                            onChange={(selectedOption) => handleInputChange({ target: { name: "zone", value: selectedOption ? selectedOption.value : '' } })}
                            options={zoneOptions}
                            isClearable={true}
                            placeholder="Selecciona región"
                            styles={{ marginBottom: '10px', control: (provided) => ({ ...provided, width: '30vh' }) }}
                        />
                    </div>
                    <div style={{ display: isMobile? '':'flex', flexDirection: 'column', textAlign:'center',width: isMobile ? 'auto' : '40vh'}}>
                        <label htmlFor="llegada" style={{marginTop:'6px',marginRight:isMobile?'10px':'' }}>Fecha</label>
                        <div style={{display: 'flex',alignItems: 'center',justifyContent:'center'}}>
                            <input 
                            type="date" 
                            id="llegada" 
                            name="llegada" 
                            value={formData.llegada} 
                            onChange={handleInputChange} 
                            max={maxDate1} 
                            min={getCurrentDate1} 
                            className={styles["gray-placeholder-input"]}
                            onFocus={(e) => e.target.classList.add('focusedBlue')}
                            onBlur={(e) => e.target.classList.remove('focusedBlue')}
                            />
                        </div>
                   </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems:'center', width: isMobile ? 'auto' : '30vh',marginTop:'8px'}}>
                        <div>
                            <label style={{ alignItems: 'bottom' }}>Salgo de</label>
                            <label style={{ marginRight: '10px' }}>
                                <input
                                    type="radio"
                                    name="salidaDe"
                                    value="Argentina"
                                    checked={!formData.salidaDe || formData.salidaDe === "Argentina"}
                                    onChange={handleInputChange}
                                    style={{ marginLeft: '10px' }}
                                    className={styles["blueYo"]}
                                />
                                Argentina
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="salidaDe"
                                    value="Otro"
                                    checked={formData.salidaDe === "Otro"}
                                    onChange={handleInputChange}
                                    style={{ marginLeft: '10px' }}
                                    className={styles["blueYo"]}
                                />
                                otro
                            </label>
                        </div>
                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile? 'center':'flex-start', gap: '20px' }}>
                            {formData.salidaDe === 'Argentina' && (
                                <div style={{ display: 'flex', flexDirection:  'column'  , alignItems: 'flex-start',marginTop:'7px'}}>
                                     <Select
                                        id="provincia"
                                        name="provincia"
                                        value={formData.provincia ? { value: formData.provincia, label: formData.provincia } : null}
                                        onChange={(selectedOption) => handleInputChange({ target: { name: "provincia", value: selectedOption ? selectedOption.value : '' } })}
                                        options={provinciaOptions}
                                        isClearable={true}
                                        placeholder="Seleccione provincia"
                                        styles={{ marginBottom: '10px', marginTop: isMobile ? '15px' : '0',  control: (provided) => ({ ...provided, width: '28vh' }) }}
                                    />
                                    {renderCities()}
                                </div>
                            )}
                            {formData.salidaDe === 'Otro' && (
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: isMobile? 'center':'flex-start', marginBottom: '10px',marginTop:'10px' }}>
                                    {/* <label htmlFor="otherLocation" style={{ marginTop: isMobile ? '5px' : '5px', marginRight: '10px'}}>lugar de salida</label> */}
                                    <input 
                                    type="text" 
                                    id="otherLocation" 
                                    name="otherLocation" 
                                    value={formData.otherLocation} 
                                    onChange={handleInputChange} 
                                    placeholder="Ej. Manly...Sidney...Indonesia" 
                                    style={{ marginTop: isMobile ? '5px' : '-2px',padding:'6px',border:'1px solid lightgray'}} 
                                    onFocus={(e) => e.target.classList.add('focusedBlue')}
                                    onBlur={(e) => e.target.classList.remove('focusedBlue')}
                                    />
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
                    style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '4px' }}
                    //  backgroundColor: 'blue', color: 'white', 
                    onMouseOver={() => { // Función para cambiar el color de fondo cuando el cursor está sobre el botón
                        if (!isLoading) {
                            event.target.style.color = '#007bff'; // Cambia a azul cuando no está cargando
                        }
                    }}
                    onMouseOut={() => { // Función para restaurar el color de fondo cuando el cursor sale del botón
                        event.target.style.color = isLoading ? '#ccc' : 'black'; // Restaura el color original
                    }}
                >
                    {isLoading ? loadingText : 'Confirmar'}
                </button>
                {confirmationMessage && <p>{confirmationMessage}</p>}
                <ToastContainer />
            </main>
        </form>
    </div>
    )
}

export default YoVoyComponent