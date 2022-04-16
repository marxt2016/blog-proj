import React, { useEffect } from "react";
import Post from "./Post";
import { useSelector, useDispatch } from "react-redux";

import { getPosts, getPostsLoadingStatus } from "../store/posts";

const Posts = ({ setCurrentId }) => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts());
  const isLoading = useSelector(getPostsLoadingStatus());

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch]);

  if (!posts?.length && !isLoading) return "No posts found";
  return (
    <>
      {!posts?.length && !isLoading ? (
        <div className="mx-44 md:mx-80 ">
          <svg className="animate-bounce w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"></path>
          </svg>
          <p className="p-3 -ml-6">Loading....</p>
        </div>
      ) : (
        <div className="w-full flex items-center justify-around flex-wrap ">
          {posts.map((post) => (
            <div className="w-96 md:max-w-md p-4" key={post._id}>
              <Post post={post} setCurrentId={setCurrentId} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
