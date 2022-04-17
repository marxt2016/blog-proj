import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadPosts, getPostsLoadingStatus, getPosts } from "../store/posts";

const PostsLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getPostsLoadingStatus());
  const posts = useSelector(getPosts());

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);
  if (isLoading)
    return (
      <div className="m-10">
        <svg className="animate-bounce w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"></path>
        </svg>
        <p className="p-3 -ml-6">Loading....</p>
      </div>
    );
  return children;
};

export default PostsLoader;
