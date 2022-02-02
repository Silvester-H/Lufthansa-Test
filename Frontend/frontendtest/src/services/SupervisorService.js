import axios from 'axios';

const SUPERVISOR_API_BASE_URL = "http://localhost:8080/api/v1/supervisors";

const config = {
    headers:   {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json" ,
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token", 
        Authorization: 'Bearer ' + localStorage.getItem('token'),
       
    }
}
class SupervisorService {

    getAllApplications(){
        return axios.get(SUPERVISOR_API_BASE_URL,config);
    }
    getApplicationById(ApplicationID){
        return axios.get(SUPERVISOR_API_BASE_URL + '/' + ApplicationID ,config);
    }   
    updateApplication(Application,ApplicationID) {
        return axios.put(SUPERVISOR_API_BASE_URL + '/' + ApplicationID, Application,config);
    }
 
    viewApplication(ApplicationID) {
        return axios.get(SUPERVISOR_API_BASE_URL + '/' + ApplicationID,config);
    }
    getVacationUser(ApplicationID){
        return axios.get(SUPERVISOR_API_BASE_URL + "Vacations/" + ApplicationID,config);
    }
}

export default new SupervisorService()