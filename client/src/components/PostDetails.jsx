import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";
import { loadPost } from "../store/posts";

const PostDetails = () => {
  const { id } = useParams();
  const post = useSelector(loadPost(id));
  if (!post) return null;

  return (
    <div className="m-auto mx-10 rounded-lg shadow-md lg:flex md:flex shadow-indigo-300 mb-3 ">
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
