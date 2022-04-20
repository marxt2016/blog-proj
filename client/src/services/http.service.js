import axios from "axios";

const http = axios.create({ baseURL: "https://blog-js.cleverapps.io/" });
//const http = axios.create({ baseURL: "http://localhost:5000/" });
// const http = axios.create({ baseURL: "http://app-166650d1-6ca6-4033-ba32-5a7cb09b651d.cleverapps.io:5000/" });
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
