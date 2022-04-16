import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadPosts, getPostsLoadingStatus } from "../store/posts";

const PostsLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getPostsLoadingStatus());

  useEffect(() => {
    dispatch(loadPosts());
  }, []);
  if (isLoading) return "Loading";
  return children;
};

export default PostsLoader;
