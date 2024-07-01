import { toast } from 'react-toastify';

export const scrollToElementRed = (elements, lastValue ) => {
// ,usuario
    const scrollToDiv = (id) => {
                const element = document.getElementById(`${id}`);

                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    element.classList.add('blinkRed');
                
                    setTimeout(() => {
                        element.classList.remove('blinkRed');  
                    }, 5000);
                
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
                } else{
                    window.location.reload()      
                    console.log('reload') 
                }
    };

    elements.some((objeto, index) => {
        if (objeto.id === lastValue) {
            scrollToDiv(index);
        }
        return false;  
    });
}