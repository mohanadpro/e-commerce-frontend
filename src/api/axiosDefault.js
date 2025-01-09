import axios from "axios";

axios.defaults.baseURL = "https://ebuy-d1c37ed2b301.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();