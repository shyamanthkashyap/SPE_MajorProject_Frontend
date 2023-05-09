import axios from "axios";

const CATEGORY_BASE_URL = "http://localhost:8080/api/category/"

class CategoryService{
    listMainCategory(){
        return axios.get(CATEGORY_BASE_URL+`listAll`);
    }

    listSubCategory(id){
        return axios.get(CATEGORY_BASE_URL+`list/${id}`)
    }

}

export default new CategoryService();