import axios from "axios";

const api = axios.create({
  // keep base url
  baseURL: "http://localhost:3333"
});

export default api;
