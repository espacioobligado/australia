import { v4 as uuidv4 } from 'uuid';

export const handleConfirmationServicios = async (e, toast, formData, setIsLoading, recaptcha, setLoadingText, router, tipo) => {
    e.preventDefault();
    setIsLoading(true);

    const captcha = document.getElementById('captcha')
    const captchaValue = recaptcha.current.getValue()

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

    const showConfirmationToast = (confirmationMessage) => {
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

    const postServicio = async (formData,generatedId) => {
        try {
            const response = await fetch('/api/postservicio', {
                method: 'POST',
                body: JSON.stringify({ formData, id: generatedId  })
            });
            setLoadingText("Espere por favor...");
            if (response.ok) {
                router.push(`/Australia/Lastcall?id=${generatedId}`, () => {
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

    const { bienoservicio, zone, region, price } = formData;
    if(price === 'marketPrice'){
     formData.price='market price'
    } 
    if (bienoservicio && zone && region && price) {
        captcha.style.display = 'block';
        if (!captchaValue) {
            setIsLoading(false); 
            } else {
                const confirmationMessage = `Necesitas ${bienoservicio} en ${zone} ${region} ${price === 'market price' ? 'a' : 'por'} ${price}.`;       
                const generatedId = uuidv4();
                postServicio(formData,generatedId)
                showConfirmationToast(confirmationMessage)
    }
    } else {
        showMoreInfoToast()
        setIsLoading(false);
    }
}