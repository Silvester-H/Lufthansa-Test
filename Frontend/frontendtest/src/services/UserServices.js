import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";
const config = {
    headers:   {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json" ,
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token", 
        Authorization: 'Bearer ' + localStorage.getItem('token'),
       
    }
}
class UserService {

    getUsers(){
        return axios.get(USER_API_BASE_URL,config);
    }
    createUser(user) {
        return axios.post(USER_API_BASE_URL,user,config);
    }
    getUserById(userID){
        return axios.get(USER_API_BASE_URL + '/' + userID,config);
    }   
    updateUser(user,userID) {
        return axios.put(USER_API_BASE_URL + '/' + userID, user,config);
    }
    updatePasswordUser(user,userID) {
        return axios.put(USER_API_BASE_URL + '/passwords/' + userID, user,config);
    }
    updateOwnPassword(user,username) {
        return axios.put(USER_API_BASE_URL + '/password/' + username, user,config);
    }
    deleteUser(userID){
        return axios.delete(USER_API_BASE_URL + '/' + userID,config);
    }
    viewUser(userID) {
        return axios.get(USER_API_BASE_URL + '/' + userID,config);
    }
    loginUser(user) {
        return axios.post(USER_API_BASE_URL + '/login/' + user,config);
    }
}

export default new UserService()