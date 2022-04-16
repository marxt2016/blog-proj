import postService from "../services/post.service";
import { createAction, createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    postsRequested: (state) => {
      state.isLoading = true;
    },
    postsReceived: (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    },
    postsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});
const { reducer: postReducer, actions } = postSlice;
const { postsRequested, postsReceived, postsRequestFailed } = actions;

export const loadPosts = () => async (dispatch) => {
  dispatch(postsRequested());
  try {
    const data = await postService.fetchAll();
    dispatch(postsReceived(data));
  } catch (error) {
    dispatch(postsRequestFailed(error.message));
  }
};

export const loadPost = (id) => (state) => {
  if (state.posts.posts) {
    return state.posts.posts.find((p) => p._id === id);
  }
};

export const getPosts = () => (state) => state.posts.posts;
export const getPostsLoadingStatus = () => (state) => state.posts.isLoading;

export default postReducer;
