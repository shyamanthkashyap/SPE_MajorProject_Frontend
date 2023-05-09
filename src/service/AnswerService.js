import axios from "axios";

const ANSWER_BASE_URL = "http://localhost:8000/api/answer/"

// var id = localStorage.getItem("id");
var user = JSON.parse(localStorage.getItem("user"));
var config = null;

if (user && user.accessToken) {
    console.log("answeeeeeeeeerrrrrrrr"+user.accessToken);
    config = {
      headers: {
        // "ngrok-skip-browser-warning": "true",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Headers": "X-Requested-With",
        Authorization: "Bearer " + user.accessToken,
      },
    };
  }

class AnswerService{
    listAnswers(id){
        new Promise(resolve => setTimeout(resolve, 1000));
        return axios.get(ANSWER_BASE_URL+`list/${id}`,config);
    }

    listMyAnswers(){
        new Promise(resolve => setTimeout(resolve, 1000));
        return axios.get(ANSWER_BASE_URL+`listMyAnswer/${user.id}`,config);
    }
}

export default new AnswerService();





