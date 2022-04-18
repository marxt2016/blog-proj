import httpService from "./http.service";
import { getUserProfile } from "./localStorage.service";
const usersEndpoint = "/user/";

const userService = {
  signIn: async (formData) => {
    const { data } = await httpService.post(`${usersEndpoint}signin`, formData);
    return data;
  },
  signUp: async (formData) => {
    const { data } = await httpService.post(`${usersEndpoint}signup`, formData);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(usersEndpoint + getUserProfile().result._id);
    return data;
  },
};

export default userService;
