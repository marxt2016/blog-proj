import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { getUserDetails } from "../store/auth";
import { createPost, getPostId, getPostsById, setPostId, updatePost } from "../store/posts";

const PostEdit = () => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState();
  const location = useLocation();
  const history = useHistory();
  //const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
  const postId = useSelector(getPostId());

  const post = useSelector(getPostsById(postId));
  //const user = JSON.parse(localStorage.getItem("profile"));
  const userDetails = useSelector(getUserDetails());
  const user = userDetails?.result;
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    selectedFile: "",
    createdAt: new Date(),
  });

  useEffect(() => {
    if (!postData.selectedFile) {
      setPreview(undefined);
      return;
    }

    setPreview(postData.selectedFile);
    setPostData({ ...postData, selectedFile: postData.selectedFile });

    return () => URL.revokeObjectURL(postData.selectedFile);
  }, [postData.selectedFile]);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const showFile = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setPostData({ ...postData, selectedFile: "" });
      return;
    }
    const result = await convertToBase64(event.target.files[0]);

    setPostData({
      ...postData,
      selectedFile: result,
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (postId) {
      dispatch(updatePost(postId, { ...postData, name: user?.name }));
      dispatch(setPostId(""));
    } else {
      dispatch(createPost({ ...postData, name: user?.name }));
    }
    if (location.pathname === "/postEditForm") history.push("/posts");
    clear();
  };
  const clear = () => {
    dispatch(setPostId(""));
    setPostData({
      title: "",
      message: "",
      author: "",
      selectedFile: "",
      createdAt: "",
    });
  };

  if (!user?.name) {
    return null;
  }
  return (
    <div className="drop-shadow-lg mb-5">
      <div className="md:max-w-screen-md md:m-auto mx-5">
        <form className="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-m text-gray-700">{postId ? "Edit " : ""}Title</label>
            <input
              className="w-full px-3 py-3 text-sm leading-tight text-gray-700 bg-gray-50 border rounded shadow appearance-none focus:outline-none focus:shadow-outline required:border-red-500"
              id="title"
              type="text"
              placeholder="Title"
              value={postData.title}
              onChange={(event) => {
                setPostData({ ...postData, title: event.target.value });
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-m  text-gray-700">{postId ? "Edit " : "Post"} Message</label>
            <textarea
              id="message"
              rows="8"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border shadow appearance-none border-gray-300 focus:outline-none required:border-red-500 "
              placeholder="Post message here..."
              value={postData.message}
              onChange={(event) => {
                setPostData({ ...postData, message: event.target.value });
              }}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-m text-gray-700">{postId ? "Edit " : ""}Author</label>
            <input
              className="w-full px-3 py-3 text-sm leading-tight text-gray-700 bg-gray-50 border rounded shadow appearance-none focus:outline-none focus:shadow-outline required:border-red-500"
              id="author"
              type="text"
              placeholder="Author name"
              value={user?.name}
              onChange={(event) => {
                setPostData({ ...postData, name: event.target.value });
              }}
            />
          </div>
          <div className="my-4">
            <label className="flex flex-col w-full .bg-gray-50 hover:bg-gray-100 border-2 border-gray-100 rounded-lg  shadow cursor-pointer">
              <div className="flex flex-col items-center justify-center pt-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                </svg>
                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600 required:border-red-500">Attach a file</p>
              </div>
              <div>
                <input type="file" className="opacity-0" onChange={showFile} value="" />

                {postData.selectedFile && <img src={preview} alt="preview" />}
              </div>
            </label>

            <div className="mt-1 text-sm text-gray-500 ">Picture for your blog post</div>
          </div>

          <button className=" w-full text-white  focus:ring-2 focus:ring-indigo-300 rounded-lg text-sm px-3 py-2 text-center">Submit</button>
        </form>
        <button className=" w-full border-none bg-gray-100 text-gray-700 hover:bg-indigo-100 px-3 py-2 my-2 text-sm" onClick={clear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default PostEdit;
