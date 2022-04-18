import postService from "../services/post.service";
import { createAction, createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: null,
    isLoading: true,
    error: null,
    postId: "",
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
    postCreated: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
    postUpdated: (state, action) => {
      state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    },
    postDeleted: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    postIdSet: (state, action) => {
      state.postId = action.payload;
    },
  },
});

const postCreateRequested = createAction("posts/postCreateRequested");
const postCreateFailed = createAction("posts/postCreateFailed");
const postUpdateRequested = createAction("posts/postUpdateRequested");
const postUpdateFailed = createAction("posts/postUpdateFailed");
const { reducer: postReducer, actions } = postSlice;
const { postsRequested, postsReceived, postsRequestFailed, postIdSet, postCreated, postUpdated, postDeleted } = actions;

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

export const createPost = (newPost) => async (dispatch) => {
  dispatch(postCreateRequested());

  try {
    const data = await postService.createPost(newPost);
    dispatch(postCreated(data));
  } catch (error) {
    dispatch(postCreateFailed(error.message));
  }
};

export const updatePost = (id, newPost) => async (dispatch) => {
  dispatch(postUpdateRequested());
  try {
    const data = await postService.updatePost(id, newPost);
    dispatch(postUpdated(data));
  } catch (error) {
    dispatch(postUpdateFailed(error.message));
  }
};

export const likePost = (id) => async (dispatch) => {
  dispatch(postUpdateRequested());
  try {
    const data = await postService.likePost(id);
    dispatch(postUpdated(data));
  } catch (error) {
    dispatch(postUpdateFailed(error.message));
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await postService.deletePost(id);

    dispatch(postDeleted(id));
  } catch (error) {
    console.log(error);
  }
};

export const setPostId = (id) => (dispatch) => {
  dispatch(postIdSet(id));
};

export const getPosts = () => (state) => state.posts.posts;
export const getPostsById = (currentId) => (state) => state.posts.posts.find((p) => p._id === currentId);
export const getPostId = () => (state) => state.posts.postId;
export const getPostsLoadingStatus = () => (state) => state.posts.isLoading;

export default postReducer;
