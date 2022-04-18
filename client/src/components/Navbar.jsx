import React, { useState, useEffect } from "react";
import decode from "jwt-decode";
import { Link, useHistory, useLocation } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { getUserDetails, logOut } from "../store/auth";
import { useSelector } from "react-redux";
import { getStatusLoggedIn } from "../store/auth";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [nav, setNav] = useState(false);
  const isLoggedIn = useSelector(getStatusLoggedIn());
  const userDetails = useSelector(getUserDetails());
  const user = userDetails?.result;

  useEffect(() => {
    const token = userDetails?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  }, [location]);

  const handleClick = () => setNav(!nav);

  const logout = () => {
    dispatch(logOut());
    history.push("/");
    setNav(!nav);
  };
  return (
    <div className="w-full h-[60px] z-10 bg-indigo-200 drop-shadow-lg mb-10 relative">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold text-gray-700 mr-4 sm:text-4xl p-1">
            <Link to="/">Blog</Link>
          </h2>
          {isLoggedIn ? (
            <ul className="hidden text-gray-700 md:flex">
              <li>
                <Link className="text-gray-700 hover:text-indigo-700" to="/postEditForm">
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
                {user.imageUrl ? (
                  <img alt={user.name.charAt(0)} src={user.imageUrl} className="h-10 w-10 object-cover rounded-full" />
                ) : (
                  <div className="font-bold text-gray-700 rounded-full bg-white flex items-center justify-center w-10 h-10">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <p>{user.name}</p>
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
                <Link className="border-none flex items-center bg-transparent text-gray-700 mr-4" to="/signin">
                  Sign In
                </Link>
                <Link to="/signup">
                  <button className="px-3 py-2 rounded-lg">Sign Up</button>
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
        {isLoggedIn && (
          <li className="border-b-2 border-indigo-300 w-full ">
            <Link className="text-gray-700 hover:text-indigo-700" to="/postEditForm" onClick={handleClick}>
              Create Post
            </Link>
          </li>
        )}

        <div>
          {user ? (
            <div>
              <div className="flex mx-3 justify-between items-center space-x-6">
                <p>{user.name}</p>
                <button className="px-3 py-1 m-1 rounded-lg" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-around my-4">
              <Link to="/signin">
                <button className="bg-transparent text-gray-600 px-6 py-2  mx-4 " onClick={handleClick}>
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
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
