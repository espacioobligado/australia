import { v4 as uuidv4 } from 'uuid';
import {handleUpdateServicios} from './handleUpdateServicios'

export const handleSaveChangesLastCall = async (toast,index, post, e,formData,posteosDelUsuarioLastCall,postSeleccionado,setPostSeleccionado,setPosteosDelUsuarioLastCall) => {

        if ((formData.bienoservicio && formData.bienoservicio.trim() === '') || (formData.price && formData.price.trim() === '')) {
            toast.error(`Campo vacio`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });  
        }else{
            const selectedPost = posteosDelUsuarioLastCall[postSeleccionado];
            const updatedPost = {
                ...selectedPost,
                bienoservicio: formData.bienoservicio ===  undefined ? selectedPost.bienoservicio : formData.bienoservicio,
                price: formData.price  === undefined ? selectedPost.price  : formData.price
            };
            setPostSeleccionado(false)
            
            if(formData.bienoservicio === undefined && formData.price === undefined)
                {
                    console.log('no guardo')
                }else{
                const updatedPosts = [...posteosDelUsuarioLastCall];
                updatedPosts[postSeleccionado] = updatedPost;
                setPosteosDelUsuarioLastCall(updatedPosts);

                const bbdd = async () => {
                console.log(81,updatedPost)
                    const okey = {
                        id:updatedPost.id,
                        bienoservicio:updatedPost.bienoservicio,
                        price:updatedPost.price
                    }
                await handleUpdateServicios(e, okey)   //toast,setIsLoading , setLoadingText, router, tipom,recaptcha
                }
                bbdd()
            }
        }   
}