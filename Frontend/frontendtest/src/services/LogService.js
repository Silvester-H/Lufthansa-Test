import axios from 'axios';

const LOG_API_BASE_URL = "http://localhost:8080/api/v1/logs";

const config = {
    headers:   {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json" ,
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token", 
        Authorization: 'Bearer ' + localStorage.getItem('token'),
       
    }
}
class LogService {

    getLogs(){
        return axios.get(LOG_API_BASE_URL,config);
    }

}

export default new LogService()