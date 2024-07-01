import { toast } from 'react-toastify';

export const scrollToElementRed = (elements, lastValue) => {
    const scrollToDiv = (id) => {
        const element = document.getElementById(`${id}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            element.classList.add('blinkRed');
        
            setTimeout(() => {
                element.classList.remove('blinkRed');
            }, 5000);

            // Descomentar si necesitas mostrar un toast
            // toast.error(`Tu usuario es ${usuario} y creaste esta publicación!`, {
            //     position: "top-center",
            //     autoClose: false,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            //     style:{marginTop:'5px'}
            // });
        }
    };

    const elementFound = elements.some((objeto, index) => {
        if (objeto.id === lastValue) {
            scrollToDiv(index);
            return true; // Detener la iteración al encontrar el elemento
        }
        return false; // Continuar iterando
    });

    // Si no se encuentra el elemento, recargar la página después de 1 segundo
    if (!elementFound) {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
};