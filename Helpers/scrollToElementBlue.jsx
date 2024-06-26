import { toast } from 'react-toastify';

// , usuario
export const scrollToElementBlue = (elements, lastValue ) => {

    const scrollToDiv = (id) => {
                const element = document.getElementById(`${id}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    element.classList.add('blinkBlue');
                
                    setTimeout(() => {
                        element.classList.remove('blinkBlue');  
                    }, 5000);
                
                    // toast.info(`Tu usuario es ${usuario} y creaste esta publicación!`, {
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

    elements.some((objeto, index) => {
        if (objeto.id === lastValue) {
            scrollToDiv(index);
        }
        return false;  
    });
}
 