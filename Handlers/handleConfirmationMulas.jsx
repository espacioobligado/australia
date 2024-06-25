import { v4 as uuidv4 } from 'uuid';



export const handleConfirmationMulas = async (playAudio,e, toast, formData, setIsLoading, recaptcha, setLoadingText, router, tipo) => {
   
    e.preventDefault();
    setIsLoading(true);

    const captcha = document.getElementById('captcha')
    const captchaValue = recaptcha.current.getValue()

    const showMoreInfoToast = () => {
        toast.info('Por favor seleccione todas las opciones antes de confirmar.', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const showConfirmationToast = (confirmationMessage) => {
    playAudio()
        toast.info(`${confirmationMessage}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const postMulas = async(formData,generatedId) => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/postmulas', {
                method: 'POST',
                body: JSON.stringify({ formData, id: generatedId })
            });

            if (response.ok) {
                router.push(`/Australia/Arribos?id=${generatedId}`, () => {
                    setIsLoading(false);
                });
            } else {
                throw new Error('La solicitud POST falló');
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    const { region, zone, llegada, salidaDe, otherLocation,provincia } = formData;
    console.log(1,otherLocation)
    console.log(2,formData)
    if (region && zone && llegada && salidaDe) {
        if(salidaDe === 'Otro' && otherLocation === '')
            {
                toast.info('Por favor completa el lugar de salida.', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setIsLoading(false);
        } else{
            captcha.style.display = 'block';
            if (!captchaValue) {
                setIsLoading(false);
            } else {
                let departureLocation = salidaDe === 'Otro' ? otherLocation : salidaDe;
                const confirmationMessage = `Has seleccionado la región ${zone} de la zona ${region} de Australia, la fecha ${llegada} y sales de ${departureLocation}.`;
                const generatedId = uuidv4();
                postMulas(formData,generatedId)-
                showConfirmationToast(confirmationMessage)
                setLoadingText("Espere por favor..."); 
            }
        }

    } else {
        showMoreInfoToast()
        setIsLoading(false);
    }
}