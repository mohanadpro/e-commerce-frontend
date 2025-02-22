import axios from "axios";

// axios.defaults.baseURL = "https://ebuy-17fcffc62fb3.herokuapp.com/";
axios.defaults.baseURL = "http://127.0.0.1:8000/";
// axios.defaults.baseURL = "https://8000-mohanadpro-ecommerce-u0r924by40r.ws.codeinstitute-ide.net/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();