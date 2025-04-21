
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
});
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useContext(AuthContext);


    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors',token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error){
        return Promise.reject(error);
    });


    // interceptors 401 and 403 status
    axiosSecure.interceptors.response.use(function(response){
        
        return response;

    }, async(error) =>{
        
        const status = error.response.status;
        console.log('status error in the interceptors', status);
        if( status === 401 || status === 403){
            await logOut();
            navigate('/signIn')

        }
        return Promise.reject(error);
    })
   return axiosSecure;
};

export default useAxiosSecure;