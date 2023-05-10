import axios from "axios";

const QUESTION_BASE_URL = `http://192.168.5.6:8000/api/question/`

var user = JSON.parse(localStorage.getItem("user"));
var config = null;

if (user && user.accessToken) {
    console.log("quessssssssssss"+user.accessToken);
    config = {
      headers: {
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Headers": "X-Requested-With",
        Authorization: "Bearer " + user.accessToken,
      },
    };
  }

class QuestionService{
    listAll(){
        new Promise(resolve => setTimeout(resolve, 1000));
        return axios.get(QUESTION_BASE_URL+"listAll", config);
    }

    listOne(id){
        new Promise(resolve => setTimeout(resolve, 1000));
        return axios.get(QUESTION_BASE_URL+`list/${id}`,config);
    }

    ListCategoryQuestions(ctgyId){
        new Promise(resolve => setTimeout(resolve, 1000));
        return axios.get(QUESTION_BASE_URL+`listCategory/${ctgyId}`,config);
    }

    ListSubCategoryQuestions(ctgyId){
        new Promise(resolve => setTimeout(resolve, 1000));
        return axios.get(QUESTION_BASE_URL+`listSubCategory/${ctgyId}`,config);
    }

    ListMyQuestions(){
        new Promise(resolve => setTimeout(resolve, 1000));
        return axios.get(QUESTION_BASE_URL+`listMyQuestion/${user.id}`,config);
    }

}

export default new QuestionService();