import axios from "axios";
import baseurl from "./baseurl";
const instance = axios.create({
  baseURL: "https://nurtemeventapi.nurtem.com/"
});

export default instance;
