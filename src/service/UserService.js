import axios from "axios";

const USER_BASE_URL = `http://192.168.10.6:8000/api/user/`

//var id = localStorage.getItem("id");
var user = JSON.parse(localStorage.getItem("user"));
var config = null;

if (user && user.accessToken) {
    console.log("userrrrrrrrrrrrrrrrrrrrr"+user.accessToken);
    config = {
      headers: {
        // "ngrok-skip-browser-warning": "true",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Headers": "X-Requested-With",
        Authorization: "Bearer " + user.accessToken,
      },
    };
  }

class UserService{
    signOut(){
        localStorage.clear();
        return axios.get(USER_BASE_URL+`signOut/`);
    }

    userProfile(){
        new Promise(resolve => setTimeout(resolve, 1000));
        return axios.get(USER_BASE_URL+`userProfile/${user.id}`,config);
    }
}

export default new UserService();