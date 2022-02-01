import axios from 'axios';

const LOGIN_API_BASE_URL = "http://localhost:8080/api/v1/authenticate";
const config = {
    headers:   {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json" ,
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token", 
        Authorization: 'Bearer ' + localStorage.getItem('token'),
       
    }
}
class LoginService {

  
   async login(logindata) {
       const res = await axios.post(LOGIN_API_BASE_URL, logindata,config);
       localStorage.setItem('username', logindata.username); 
       localStorage.setItem('token', res.data.jwt); 
       localStorage.setItem('user_type', res.data.user_type); 
    }

    async logout() {
        let username= localStorage.getItem('username');
        localStorage.setItem('username', ''); 
        localStorage.setItem('token', ''); 
        localStorage.setItem('user_type', ''); 
        return axios.get('http://localhost:8080/api/v1/logout' + username,config);
    }
   
}

export default new LoginService()