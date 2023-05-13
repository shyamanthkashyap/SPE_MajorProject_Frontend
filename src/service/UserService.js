import axios from "axios";

const USER_BASE_URL = `http://localhost:8000/api/user/`

var user = JSON.parse(localStorage.getItem("user"));
var config = null;


if (user && user.accessToken) {
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
        var id = user.id;
        localStorage.removeItem('user');
        return axios.get(`http://localhost:8000/api/auth/user/signout/${id}`,config);
    }

    userProfile(){
        new Promise(resolve => setTimeout(resolve, 1000));
        return axios.get(USER_BASE_URL+`userProfile/${user.id}`,config);
    }

    updatePoints(id){
      return axios.get(USER_BASE_URL+`updatepoints/${id}`,config);
    }
}

export default new UserService();