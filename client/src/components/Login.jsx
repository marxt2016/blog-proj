import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik } from "formik";
import { GoogleLogin } from "react-google-login";
// import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { signup, signin } from "../actions/authorize";

const initialForm = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Login = ({ isSignup, setIsSignUp }) => {
  const [formData, setFormData] = useState(initialForm);
  // const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassord] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const loginSchema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup.string().min(4, "Password is too short").max(14, "Password is too long").required("Password is required"),
    lastName: isSignup ? yup.string().required("Lastname is required") : yup.string(),
    firstName: isSignup ? yup.string().required("Firstname is required") : yup.string(),
  });

  const handleSubmitForm = () => {
    if (formData.email && formData.password) {
      if (isSignup) {
        dispatch(signup(formData, history));
      } else {
        dispatch(signin(formData, history));
      }
    }
  };

  useEffect(() => {
    handleSubmitForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const changeToSignIn = () => {
    setIsSignUp((prevState) => !prevState);
  };
  const handleClickShowPassword = () => {
    setShowPassord((prevState) => !prevState);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTHORIZE", payload: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log("Failed with google login");
  };

  return (
    <div className="w-full max-w-md m-auto bg-white rounded-lg border shadow-md">
      <h3 className="text-2xl text-center my-3">{isSignup ? "Create an Account" : "Sign In"}</h3>
      <Formik initialValues={initialForm} onSubmit={(values) => setFormData({ ...formData, ...values })} validationSchema={loginSchema}>
        {(props) => {
          const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;
          return (
            <form className="px-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
              <div className="mb-4 md:flex md:justify-between">
                {isSignup && (
                  <>
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700 ">First Name*</label>
                      <input
                        className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="firstName"
                        type="text"
                        placeholder="firstname"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.firstName && touched.firstName && <p className="text-xs italic text-red-500">{errors.firstName}</p>}
                    </div>
                    <div className="md:ml-2">
                      <label className="block mb-2 text-sm font-bold text-gray-700">Last Name*</label>
                      <input
                        className="w-full px-3 py-2 text-sm mb-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="lastName"
                        type="text"
                        placeholder="lastname"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.lastName && touched.lastName && <p className="text-xs italic text-red-500">{errors.lastName}</p>}
                    </div>
                  </>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700 ">Email*</label>
                <input
                  className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  name="email"
                  type="text"
                  value={values.email}
                  placeholder="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && <p className="text-xs italic mb-2 text-red-500">{errors.email}</p>}

                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                  Password*
                </label>
                <input
                  className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline relative"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="password"
                />
                <button className="absolute -ml-7 mt-2 text-center text-gray-500 bg-transparent border-none" type="button" onClick={handleClickShowPassword}>
                  {showPassword ? <EyeIcon className="w-5 cursor-pointer" /> : <EyeOffIcon className="w-5 cursor-pointer" />}
                </button>
                {isSignup && errors.password && touched.password && <p className="text-xs italic text-red-500">{errors.password}</p>}
              </div>
              {isSignup && (
                <div className="w-full ">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="confirmPassword">
                    Confirm Password*
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    name="confirmPassword"
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="confirm password"
                  />
                  <button className="absolute -ml-7 mt-2 text-center text-gray-500 bg-transparent border-none" type="button" onClick={handleClickShowPassword}>
                    {showPassword ? <EyeIcon className="w-5 cursor-pointer" /> : <EyeOffIcon className="w-5 cursor-pointer" />}
                  </button>
                </div>
              )}

              <div className="mb-2 text-center">
                <button
                  className="w-full px-4 py-2 text-white border bg-indigo-600 border-indigo-600 
    hover:bg-transparent hover:text-indigo-600 rounded-md"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSignup ? "Register" : "Login"}
                </button>
              </div>
              <GoogleLogin
                clientId="962925054272-lndsu914k1j7d372dh3ove0dqom90n56.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button
                    className="flex justify-center w-full px-4 py-2 mb-2 text-center text-gray-500 bg-transparent border"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="mx-1 my-0.5" />
                    <p>Login with Google account</p>
                  </button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />
              <div className="text-center">
                <div className="inline-block text-sm text-indigo-500 align-baseline hover:text-indigo-800 cursor-pointer" onClick={changeToSignIn}>
                  {isSignup ? "Already have an account? Login!" : "Please register if you have no account"}
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
