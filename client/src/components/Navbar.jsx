import React, { useState, useEffect } from "react";
import decode from "jwt-decode";
import { Link, useHistory, useLocation } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";

const NavBar = ({ isSignup, setIsSignUp }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleClick = () => setNav(!nav);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
    setNav(!nav);
  };
  return (
    <div className="w-full h-[60px] z-10 bg-indigo-200 drop-shadow-lg mb-10 relative">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold text-gray-700 mr-4 sm:text-4xl p-1">
            <Link to="/">Blog</Link>
          </h2>
          {user?.result.name ? (
            <ul className="hidden text-gray-700 md:flex">
              <li>
                <Link className="text-gray-700 hover:text-indigo-700" to="/post">
                  Create Post
                </Link>
              </li>
            </ul>
          ) : null}
        </div>
        <div>
          {user ? (
            <>
              <div className="hidden md:flex justify-between items-center space-x-6">
                {user.result.imageUrl ? (
                  <img alt={user.result.name.charAt(0)} src={user.result.imageUrl} className="h-10 w-10 object-cover rounded-full" />
                ) : (
                  <div className="font-bold text-gray-700 rounded-full bg-white flex items-center justify-center w-10 h-10">
                    {user.result.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <p>{user.result.name}</p>
                <button className="px-3 py-2 rounded-lg" onClick={logout}>
                  Logout
                </button>
              </div>
              <div className="md:hidden cursor-pointer" onClick={handleClick}>
                {!nav ? <MenuIcon className="w-5 -mx-1" /> : <XIcon className="w-4" />}
              </div>
            </>
          ) : (
            <>
              <div className="hidden md:flex pr-4">
                <Link className="border-none flex items-center bg-transparent text-gray-700 mr-4" to="/login" onClick={() => setIsSignUp(false)}>
                  Sign In
                </Link>
                <Link to="/login">
                  <button className="px-3 py-2 rounded-lg" onClick={() => setIsSignUp(true)}>
                    Sign Up
                  </button>
                </Link>
              </div>
              <div className="md:hidden cursor-pointer" onClick={handleClick}>
                {!nav ? <MenuIcon className="w-5" /> : <XIcon className="w-4" />}
              </div>
            </>
          )}
        </div>
      </div>
      <ul className={!nav ? "hidden" : "absolute bg-indigo-50 w-full px-8 md:hidden"}>
        <li className="border-b-2 border-indigo-300 w-full ">
          <Link className="text-gray-700 hover:text-indigo-700" to="/post" onClick={handleClick}>
            Create Post
          </Link>
        </li>
        <div>
          {user ? (
            <div>
              <div className="flex mx-3 justify-between items-center space-x-6">
                <p>{user.result.name}</p>
                <button className="px-3 py-1 m-1 rounded-lg" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-around my-4">
              <Link to="/login">
                <button className="bg-transparent text-gray-600 px-6 py-2  mx-4 " onClick={handleClick}>
                  Sign In
                </button>
              </Link>
              <Link to="/login">
                <button className="px-3 py-2 rounded-lg" onClick={handleClick}>
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
};

export default NavBar;
