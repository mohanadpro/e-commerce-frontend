import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

// axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();