import axios from "axios";
import { API_BASE_URL, API_TIMEOUT } from "./config";

const axiosIntance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  responseType: "json",
});

export default axiosIntance;
