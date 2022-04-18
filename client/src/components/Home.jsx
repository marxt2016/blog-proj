import React from "react";
import { useSelector } from "react-redux";
import { getStatusLoggedIn } from "../store/auth";
import PostEdit from "./PostEdit";
import Posts from "./Posts";

const Home = () => {
  const isLoggedIn = useSelector(getStatusLoggedIn());
  return (
    <div className="flex items-start justify-around mx-5 ">
      <div className="">
        <Posts />
      </div>
      {isLoggedIn && (
        <div className="hidden md:flex py-3 items-center ">
          <PostEdit />
        </div>
      )}
    </div>
  );
};

export default Home;
