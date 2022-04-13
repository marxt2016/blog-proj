import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import { getPost } from "../actions/posts";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  if (!post) return null;
  if (isLoading) {
    <div className="mx-44 md:mx-80 ">
      <svg className="animate-bounce w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"></path>
      </svg>
      <p className="p-3 -ml-6">Loading....</p>
    </div>;
  }
  return (
    <div className="m-auto mx-10 rounded-lg shadow-md lg:flex md:flex shadow-indigo-300 ">
      <img className="object-cover w-full md:w-1/2 lg:w-1/3" src={post.selectedFile} alt="postimage" />
      <div className="px-6 py-4 md:w-2/3 flex flex-col justify-between">
        <h2 className="text-gray-900 font-bold text-2xl  tracking-tight mb-2 ">{post.title}</h2>
        <p className="mb-2 text-sm leading-normal text-justify text-gray-900">{post.message}</p>

        <div className="flex justify-between">
          <p className="text-sm text-gray-600 mb-3 ">{post.name}</p>
          <p className="text-sm text-gray-300 mb-3  ">{moment(post.createdAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
