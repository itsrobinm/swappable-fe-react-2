import axios from "axios";

//import the store there below
//import { store } from "./app/store";

const axiosInstance =
  axios.create(/*{
  baseURL: API_BASE_URL,
} */);

export default axiosInstance;
