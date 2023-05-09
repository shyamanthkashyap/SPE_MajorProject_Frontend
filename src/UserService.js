import axios from "axios";

const USER_BASE_URL = "http://localhost:8080/api/user/"

var id = localStorage.getItem("id");

class UserService{
    signOut(){
        localStorage.clear();
        return axios.get(USER_BASE_URL+`signOut/`);
    }

    userProfile(){
        return axios.get(USER_BASE_URL+`userProfile/${id}`);
    }
}

export default new UserService();