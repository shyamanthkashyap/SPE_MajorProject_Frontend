import axios from "axios";

const CATEGORY_BASE_URL = "http://localhost:8000/api/category/"

var user = JSON.parse(localStorage.getItem("user"));
var config = null;

if (user && user.accessToken) {
    console.log("Token....................."+user.accessToken);
    config = {
      headers: {
        // "ngrok-skip-browser-warning": "true",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Headers": "X-Requested-With",
        Authorization: "Bearer " + user.accessToken,
      },
    };
  }

class CategoryService{
    listMainCategory(){
        new Promise(resolve => setTimeout(resolve, 1000));
        return axios.get(CATEGORY_BASE_URL+`listAll`,config);
    }

    listSubCategory(id){
        new Promise(resolve => setTimeout(resolve, 1000));
        return axios.get(CATEGORY_BASE_URL+`list/${id}`,config)
    }

}

export default new CategoryService();