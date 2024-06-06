// import { v4 as uuidv4 } from 'uuid';

export const handleUpdateServicios = async (e, formData) => {
    // toast, setIsLoading, recaptcha, setLoadingText, router, tipo
    // e.preventDefault();
    // setIsLoading(true);
    // const captcha = document.getElementById('captcha')
    // const captchaValue = recaptcha.current.getValue()

    const showMoreInfoToast = () => {
        toast.error('Por favor seleccione todas las opciones antes de confirmar.', {
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

    const showUpdateToast = (confirmationMessage) => {
        toast.error(`${confirmationMessage}`, {
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

    const updateServicio = async (formData) => {
        // generatedId
        try {
            const response = await fetch('/api/updateservicio', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({ formData })
                // , id: generatedId
            });
            // setLoadingText("Espere por favor...");
            if (response.ok) {
                // setIsLoading(false);
                // router.push(`/Australia/Lastcall?id=${generatedId}`, () => {
                // });
                console.log('ok')
            } else {
                throw new Error('La solicitud UPDATE falló');
            }
        } catch (error) {
            console.error(error);
            // setIsLoading(false);
        }
    }

    const { bienoservicio, region, price } = formData;
    console.log(formData)
    if (bienoservicio || region || price) {
        // Si al menos uno de los campos está presente, realizar la actualización
        updateServicio(formData);
    } else {
        // Si ninguno de los campos está presente, mostrar el toast de falta de información
        // showUpdateToast();
    }
    // if (bienoservicio && region && price) {
        // console.log('bienoservicio && region && price')
        // captcha.style.display = 'block';
        // if (!captchaValue) {
            // setIsLoading(false); 
            // } else {
                // const confirmationMessage = `Necesitas ${bienoservicio} en ${region} ${price === 'marketPrice' ? 'a' : 'por'} ${price === 'marketPrice' ? 'market price' : `${price}`}.`;       
                // const generatedId = uuidv4();
                // generatedId
                // showUpdateToast(confirmationMessage)
            // }
    // } else {
        // showMoreInfoToast()
        // setIsLoading(false);
    // }
}