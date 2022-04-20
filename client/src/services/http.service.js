import axios from "axios";
const http = axios.create({ baseURL: "http://31.184.253.165:80/" });
// const http = axios.create({ baseURL: "http://backendlink/" });

http.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }
  return req;
});

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
