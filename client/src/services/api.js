import axios from "axios";

const api = axios.create({
  baseURL: "https://documind-2fha.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
