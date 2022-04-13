import React, { useState } from "react";
import PostEdit from "./PostEdit";
import Posts from "./Posts";

const Home = ({ currentId, setCurrentId }) => {
  return (
    <div className="flex items-start justify-around mx-5 ">
      <div className="">
        <Posts setCurrentId={setCurrentId} />
      </div>
      <div className="hidden md:flex py-3 items-center ">
        <PostEdit currentId={currentId} setCurrentId={setCurrentId} />
      </div>
    </div>
  );
};

export default Home;
