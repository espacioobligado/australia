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

    elements.some((objeto) => {
        if (objeto.id === lastValue) {
            try {
                scrollToDiv(lastValue);
            } catch (error) {
                console.error('Error scrolling to element:', error);
                localStorage.setItem('scrollToLastValue', lastValue); // Almacenar el valor antes de recargar
                window.location.reload();
            }
            return true; // Detener la iteración al encontrar el elemento
        }
        return false; // Continuar iterando
    });

    // Intentar desplazar al elemento después de recargar la página
    window.addEventListener('load', () => {
        const lastValue = localStorage.getItem('scrollToLastValue');
        if (lastValue) {
            elements.some((objeto) => {
                if (objeto.id === lastValue) {
                    scrollToDiv(lastValue);
                    localStorage.removeItem('scrollToLastValue'); // Limpiar el valor almacenado
                    return true; // Detener la iteración al encontrar el elemento
                }
                return false; // Continuar iterando
            });
        }
    });
};
