import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }
  return req;
});

export const fetchAll = () => API.get("posts");
export const fetchPost = (id) => API.get(`posts/${id}`);
export const fetchSearchedPosts = (searchString) => API.get(`posts/search?searchString=${searchString || "none"}`);
export const createPost = (newPost) => API.post("posts", newPost);
export const updatePost = (id, newPost) => API.patch(`posts/${id}`, newPost);
export const deletePost = (id) => API.delete(`posts/${id}`);
export const likePost = (id, newPost) => API.patch(`posts/${id}/likePost`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
