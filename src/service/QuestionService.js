import axios from "axios";

const QUESTION_BASE_URL = "http://localhost:8080/api/question/"

var id = localStorage.getItem("id");

class QuestionService{
    listAll(){
        return axios.get(QUESTION_BASE_URL+"listAll");
    }

    listOne(id){
        return axios.get(QUESTION_BASE_URL+`list/${id}`);
    }

    ListCategoryQuestions(ctgyId){
        return axios.get(QUESTION_BASE_URL+`listCategory/${ctgyId}`);
    }

    ListSubCategoryQuestions(ctgyId){
        return axios.get(QUESTION_BASE_URL+`listSubCategory/${ctgyId}`);
    }

    ListMyQuestions(){
        return axios.get(QUESTION_BASE_URL+`listMyQuestion/${id}`);
    }

}

export default new QuestionService();