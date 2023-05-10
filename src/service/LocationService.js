import axios from "axios";

const LOCATION_BASE_URL = `http://172.18.0.20:8000/api/location/`

var user = JSON.parse(localStorage.getItem("user"));
var config = null;

if (user && user.accessToken) {
    console.log("locationnssssssssssss"+user.accessToken);
    config = {
      headers: {
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Headers": "X-Requested-With",
        Authorization: "Bearer " + user.accessToken,
      },
    };
  }

class LocationService{
    listStates(cty){
        new Promise(resolve => setTimeout(resolve, 1000));
        return axios.get(LOCATION_BASE_URL+`state/${cty}`,config);
    }

    listCtys(){
        new Promise(resolve => setTimeout(resolve, 1000));
        return axios.get(LOCATION_BASE_URL+`country/`,config);
    }

    listCities(cty, st){
        new Promise(resolve => setTimeout(resolve, 1000));
        return axios.get(LOCATION_BASE_URL+`city/${cty}/${st}`,config);
    }
}

export default new LocationService();