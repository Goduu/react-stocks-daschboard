import axios from 'axios';
// import history from './index';
import { useSelector, useDispatch } from 'react-redux';
import { setStatus } from '../../logged_out/components/register_login/loginSlice'

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.request.use(req => {
    
    const token = JSON.parse(sessionStorage.getItem('token'));
 
    // console.log("alcapaha req", req);
    if(token){
        req.headers.Authorization = 'Bearer ' + token;
    }
    return req;
});

// function SetTokenHelper(value){
//     // const token = sessionStorage.getItem('token');
//     const {setToken} = useToken();

//     console.log('SetTokenHelper');
//     // sessionStorage.setItem('token', value);
//     setToken(value);
// }

axios.interceptors.response.use(
    response => {
    
    return response
},  error => {

    const token = localStorage.getItem('token');
    console.log('token in error', token)
    
    const response = error.response;
    const status = response.status
    if(response){
        if(status === 403 || status === 401){
            console.error('DEU ERRO', response)
            // alert("[ "+response.status+ " - "+ response.statusText + "] "+response.data.message);
            setStatus(status);
        }
    
        console.log('status, data,config', response,error)

    }
    // console.log("error 401", error)

    // if(status === 401){
    //     console.log("error 401", history)
    // }
    return Promise.reject(error);
  });