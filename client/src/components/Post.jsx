import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { ThumbUpIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import { likePost } from "../actions/posts";
import { useHistory } from "react-router-dom";
import { getUserDetails } from "../store/auth";
import { useSelector } from "react-redux";
import { getStatusLoggedIn } from "../store/auth";
import { setPostId, deletePost } from "../store/posts";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector(getStatusLoggedIn());
  const userDetails = useSelector(getUserDetails());
  const user = userDetails?.result;

  const openDetails = () => {
    history.push(`posts/${post._id}`);
  };
  return (
    <div className="bg-white drop-shadow-lg border border-gray-200 rounded-lg mb-5">
      <img className="rounded-t-lg h-64 w-full" src={post.selectedFile} alt="postimage" />

      <div className="p-3">
        <div className="flex justify-between text-m2 text-gray-500">
          <h5 className="text-gray-900 font-bold text-2xl  tracking-tight mb-2 truncate ...">{post.title}</h5>
          {isLoggedIn && (user.googleId === post?.author || user._id === post?.author) && (
            <p className="cursor-pointer" onClick={() => dispatch(setPostId(post._id))}>
              <DotsVerticalIcon className="w-5" />
            </p>
          )}
        </div>
        <p className="font-normal text-gray-700 mb-3 h-24 text-ellipsis overflow-hidden ...">{post.message}</p>
        <div className="flex justify-between">
          <p className="text-sm text-gray-600 mb-3  text-ellipsis overflow-hidden ...">{post.name}</p>
          <p className="text-sm text-gray-300 mb-3  ">{moment(post.createdAt).fromNow()}</p>
        </div>

        <div className="flex justify-between items-center">
          <button className="text-white focus:ring-2 focus:ring-indigo-300 rounded-lg text-sm px-3 py-2 text-center " onClick={openDetails}>
            Read more
          </button>
          {isLoggedIn && (user?.googleId === post?.author || user?._id === post?.author) && (
            <button
              className="bg-transparent text-gray-600 hover:text-indigo-800 border-none focus:ring-2
           focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
              onClick={() => dispatch(deletePost(post._id))}
            >
              Delete
            </button>
          )}

          <div className="text-sm"> Likes {post.likes.length}</div>
          {isLoggedIn && (
            <p className="flex justify-between text-m2 text-gray-500 hover:text-indigo-800 cursor-pointer" onClick={() => dispatch(likePost(post._id))}>
              <ThumbUpIcon className="w-5" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
