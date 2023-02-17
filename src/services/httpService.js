import axios from 'axios';
import { toast } from 'react-toastify';
// import auth from './authService';



axios.interceptors.response.use(null, error => {

    const expectederror =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectederror) {
        // console.log("Logging the error",error);
        toast.error("An unexpected error occured");
    }


    return Promise.reject(error);
})


export function setJwt(jwt){
axios.defaults.headers.common["x-auth-token"]=jwt;
}



const http = {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
    setJwt
}

export default http;