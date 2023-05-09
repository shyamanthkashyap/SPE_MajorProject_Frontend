import axios from "axios";

const LOCATION_BASE_URL = "http://localhost:8080/api/location/"

class LocationService{
    listStates(cty){
        return axios.get(LOCATION_BASE_URL+`state/${cty}`);
    }

    listCtys(){
        return axios.get(LOCATION_BASE_URL+`country/`);
    }

    listCities(cty, st){
        return axios.get(LOCATION_BASE_URL+`city/${cty}/${st}`);
    }
}

export default new LocationService();