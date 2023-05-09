import axios from "axios";

const ANSWER_BASE_URL = "http://localhost:8000/api/answer/"

var id = localStorage.getItem("id");

class AnswerService{
    listAnswers(id){
        return axios.get(ANSWER_BASE_URL+`list/${id}`);
    }

    listMyAnswers(){
        return axios.get(ANSWER_BASE_URL+`listMyAnswer/${id}`);
    }
}

export default new AnswerService();





