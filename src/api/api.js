import axios from "axios";

const API = axios.create({
  baseURL: "https://notes-management-3rhb.onrender.com/api/",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
