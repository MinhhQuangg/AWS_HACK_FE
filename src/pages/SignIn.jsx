import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import visibility from "../assets/eye-solid.svg";
import visibilityOff from "../assets/eye-slash-solid.svg";
import { styles } from "../styles";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import {
  showToastError,
  showToastSuccess,
} from "../components/common/ShowToast";
import { useAuth } from "../context/authContext";
import logo from "../assets/aws_voice_logo.png";

const SignIn = () => {
  const formContext = useForm();
  const { register, handleSubmit, formState } = formContext;
  const { errors } = formState;
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signin",
        data
      );
      if (response.data.status === "success") {
        showToastSuccess("Login successful");
        login(response.data?.token);
        localStorage.setItem("user_id", response.data.user?.id);
        navigate("/");
      }
    } catch (err) {
      showToastError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSuccess = async (response) => {
    try {
      setLoading(true);
      const googleData = { token: response.credential };
      const result = await axios.post(
        "http://localhost:5000/api/users/google",
        googleData,
        {
          withCredentials: true,
        }
      );
      if (result.data.status === "success") {
        showToastSuccess("Login successful");
        localStorage.setItem("user_id", result.data.user?.id);
        login(result.data?.token);
        navigate("/");
      }
    } catch (err) {
      showToastError("Google login failed.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleFailure = (error) => {
    showToastError("Google authentication failed");
    // console.error("Google authentication error:", error);
  };
  // const login = useGoogleLogin({
  //   onSuccess: handleGoogleSuccess,
  //   onError: handleGoogleFailure,
  // });
  return (
    <div className="flex justify-center items-center h-screen relative w-full">
      <div className="absolute top-5 left-5 lg:top-10 lg:left-10">
        <div
          className={`text-primary font-bold cursor-pointer flex items-center justify-center gap-2`}
          onClick={() => navigate("/")}
        >
          <div className="flex items-center justify-center">
            <img src={logo} alt="" className="h-10" />
          </div>
          <div className="text-center">SocialSim</div>
        </div>
      </div>
      <div className="flex flex-col w-[80%] max-w-[500px] 2xl:gap-10 xl:gap-10 lg:gap-8 md:gap-6 xs:gap-4 gap-2">
        <div className={`flex flex-col items-center justify-center mt-2`}>
          <h2
            className={`${styles.headerText} font-['Fredoka One'] font-bold text-primary-dark mb-2 text-center`}
          >
            SIGN IN
          </h2>
          <p
            className={`${styles.headerSubText} 2xl:text-[31px] font-['Fredoka'] text-center`}
          >
            Become more confident in no time!
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:gap-2"
        >
          <div className="flex flex-col lg:gap-2">
            <label
              className={` ${styles.sectionHeadText} font-["Montserrat"] font-bold mb-1`}
            >
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: { value: true, message: "Email is required" },
              })}
              className="border border-gray-300 textgray 2xl:text-md xl:text-md lg-text-md text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 2xl:p-2.5 sm:p-1.5 p-1"
            />

            <span
              className={`text-red-500 text-sm min-h-[1.25rem] ${
                errors.email ? "opacity-100" : "opacity-0"
              } transition-opacity duration-200`}
            >
              {errors.email ? errors.email.message : " "}
            </span>
          </div>

          <div className="flex flex-col mb-3">
            <label
              className={` ${styles.sectionHeadText} font-["Montserrat"] font-bold mb-1`}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="border border-gray-300 textgray 2xl:text-md xl:text-md lg-text-md text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 2xl:p-2.5 sm:p-1.5 p-1"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-[50%] right-7"
                style={{ transform: "translate(50%, -50%)" }}
              >
                {showPassword ? (
                  <img
                    src={visibility}
                    alt="invisible"
                    className="w-auto h-6"
                  />
                ) : (
                  <img
                    src={visibilityOff}
                    alt="visible"
                    className="w-auto h-6"
                  />
                )}
              </button>
            </div>
            <span
              className={`text-red-500 text-sm min-h-[1.25rem] ${
                errors.password ? "opacity-100" : "opacity-0"
              } transition-opacity duration-200`}
            >
              {errors.password ? errors.password.message : " "}
            </span>
          </div>

          <div className="flex justify-between font-['Montserrat'] pt-5 text-center lg:text-[1.35rem]">
            <div></div>
            <div className={`mb-2`}>
              Don't have an account?
              <button
                type="button"
                onClick={() => navigate("/Signup")}
                className="underline ml-2 text-primary hover:text-primary-dark transition-colors duration-200"
              >
                Sign up!
              </button>
            </div>
          </div>

          {/* <div className="flex flex-col items-center justify-around mt-4 w-full gap-6"> */}
          <div className="relative w-full max-w-md mx-auto">
            {/* Bottom button (background layer) */}

            {/* Top button (floating on top of the bottom one) */}
            <button className="absolute top-2 left-0 w-full font-['Inter'] bg-primary-dark text-black font-bold text-[1.15rem] lg:text-[1.35rem] md:py-3 py-1 rounded-[10px] shadow-inner z-0">
              h
            </button>

            {/* Top button (main button) */}
            <button
              className="relative z-10 w-full font-['Inter'] bg-primary text-white font-bold text-[1.15rem] lg:text-[1.35rem] md:py-3 py-1 rounded-[10px] transition-all duration-150 active:translate-y-[2px] active:shadow-inner"
              onClick={onSubmit}
            >
              {loading ? "Loading..." : "Get Started"}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center w-full">
          <hr className="w-full h-px bg-gray-800 border-0" />
          <span className="absolute px-3 text-sm text-gray-900 bg-white">
            or
          </span>
        </div>
        <div className="relative w-full max-w-md mx-auto flex items-center justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
            size="large"
            theme="outline"
            className={`relative z-10 w-full font-["Inter"] bg-white font-bold text-[1.15rem] lg:text-[1.35rem] md:py-3 py-1 rounded-[10px] transition-all duration-150 active:translate-y-[2px] active:shadow-inner flex items-center justify-center border-2 border-gray-300`}
          >
            {loading ? (
              "Loading..."
            ) : (
              <>
                <img
                  src="https://img.icons8.com/color/24/000000/google-logo.png"
                  alt="Google Logo"
                  className="mr-2"
                />
                Sign up with Google
              </>
            )}
          </GoogleLogin>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default SignIn;
