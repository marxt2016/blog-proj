import httpService from "./http.service";
const usersEndpoint = "/user/";

const userService = {
  signIn: async (formData) => {
    const { data } = await httpService.post(`${usersEndpoint}signin`, formData);
    return data;
  },
  signUp: async (formData) => {
    const { data } = await httpService.post(`${usersEndpoint}/signup`, formData);
    return data;
  },
};

export default userService;
