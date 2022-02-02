import axios from 'axios';

const Application_API_BASE_URL = "http://localhost:8080/api/v1/application";

const config = {
    headers:   {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json" ,
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token", 
        Authorization: 'Bearer ' + localStorage.getItem('token'),
       
    }
}
class ApplicationService {

    getApplications(){
        return axios.get(Application_API_BASE_URL,config);
    }
    getApplicationVacations(){
        return axios.get(Application_API_BASE_URL + "Vacations",config);
    }
    createApplication(Application) {
        return axios.post(Application_API_BASE_URL,Application,config);
    }
    getApplicationById(ApplicationID){
        return axios.get(Application_API_BASE_URL + '/' + ApplicationID ,config);
    }   
    updateApplication(Application,ApplicationID) {
        return axios.put(Application_API_BASE_URL + '/' + ApplicationID, Application,config);
    }
    deleteApplication(ApplicationID){
        return axios.delete(Application_API_BASE_URL + '/' + ApplicationID,config);
    }
    viewApplication(ApplicationID) {
        return axios.get(Application_API_BASE_URL + '/' + ApplicationID,config);
    }
}

export default new ApplicationService()