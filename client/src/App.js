import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import PostEdit from "./components/PostEdit";
import PostDetails from "./components/PostDetails";
import PostsLoader from "./hoc/postsLoader";

const App = () => {
  return (
    <PostsLoader>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/signin" exact component={Login} />
          <Route path="/signup" exact component={Login} />
          <Route path="/postEditForm" component={PostEdit} />
          <Route path="/posts/:id" component={PostDetails} />
        </Switch>
      </BrowserRouter>
    </PostsLoader>
  );
};

export default App;
