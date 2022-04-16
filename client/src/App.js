import React, { useState } from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import PostEdit from "./components/PostEdit";
import PostDetails from "./components/PostDetails";
import PostsLoader from "./hoc/postsLoader";
import Posts from "./components/Posts";

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const [isSignup, setIsSignUp] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <PostsLoader>
      <BrowserRouter>
        <NavBar isSignup={isSignup} setIsSignUp={setIsSignUp} />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/login" exact component={() => (!user ? <Login isSignup={isSignup} setIsSignUp={setIsSignUp} /> : <Redirect to="/posts" />)} />
          {/* <Route path="/posts" exact component={() => <Home currentId={currentId} setCurrentId={setCurrentId} />} /> */}
          <Route path="/posts" exact component={Posts} />
          <Route path="/post" component={() => <PostEdit currentId={currentId} setCurrentId={setCurrentId} />} />
          <Route path="/posts/:id" component={PostDetails} />
        </Switch>
      </BrowserRouter>
    </PostsLoader>
  );
};

export default App;
