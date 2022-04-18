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

  createPost: async (newPost) => {
    const { data } = await httpService.post(postsEndpoint, newPost);

    return data;
  },

  updatePost: async (id, newPost) => {
    const { data } = await httpService.patch(`${postsEndpoint}/${id}`, newPost);

    return data;
  },

  likePost: async (id) => {
    const { data } = await httpService.patch(`${postsEndpoint}/${id}/likePost`);
    return data;
  },
  deletePost: async (id) => {
    const { data } = await httpService.delete(`${postsEndpoint}/${id}`);

    return data;
  },
};

export default postService;
