import httpService from "./http.service";
const postsEndpoint = "posts";

const postService = {
  fetchAll: async () => {
    const { data } = await httpService.get(postsEndpoint);

    return data;
  },
  fetchPost: async (id) => {
    const { data } = await httpService.get(`${postsEndpoint}/${id}`);
    return data;
  },
};

export default postService;
