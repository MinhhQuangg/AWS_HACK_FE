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

const SignUp = () => {
  const formContext = useForm();
  const { register, handleSubmit, formState, watch } = formContext;
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");
  const { errors } = formState;
  const { login } = useAuth();
  const navigate = useNavigate();
  // const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        data
      );
      console.log(response);
      if (response.data?.status === "success") {
        showToastSuccess(response.data?.message);
        localStorage.setItem("user_id", response.data.user?.id);
        login(response.data?.token);
        navigate("/");
      }
    } catch (err) {
      showToastError(err.response?.data?.message);
      console.log(err);
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
        // showToastSuccess("Login successful");
        localStorage.setItem("user_id", result.data.user?.id);
        console.log(3333, localStorage.getItem("user_id"));

        // login(result.data?.token);
        navigate("/");
      }
    } catch (err) {
      console.error("Error during Google login:", err);
      // showToastError("Google login failed.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleFailure = (error) => {
    // showToastError("Google authentication failed");
    console.error("Google authentication error:", error);
  };
  return (
    <div className="flex justify-center items-center h-screen relative w-full">
      <div className="absolute top-5 left-5 lg:top-10 lg:left-10">
        <div
          className={`${styles.headerSubText} flex items-center text-primary cursor-pointer`}
          onClick={() => navigate("/")}
        >
          LOGO
          {/* <img
            src={logo}
            alt="Logo"
            className="cursor-pointer w-[53px] h-[50px]"
            onClick={() => navigate("/")}
          /> */}
        </div>
      </div>
      <div className="flex flex-col w-[80%] max-w-[500px] 2xl:gap-18 xl:gap-16 lg:gap-12 md:gap 10 xs:gap-6 gap-4">
        <div className={`flex flex-col items-center justify-center mt-2`}>
          <h2
            className={`${styles.headerText} font-['Fredoka One'] font-bold text-primary-dark mb-2 text-center`}
          >
            SIGN UP
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
              Username
            </label>
            <input
              type="text"
              placeholder="Your username..."
              {...register("username", {
                required: { value: true, message: "Username is required" },
              })}
              className="border border-gray-300 textgray 2xl:text-md xl:text-md lg-text-md text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 2xl:p-2.5 sm:p-1.5 p-1"
            />
          </div>
          <span
            className={`text-red-500 text-sm min-h-[1.25rem] ${
              errors.username ? "opacity-100" : "opacity-0"
            } transition-opacity duration-200`}
          >
            {errors.username ? errors.username.message : " "}
          </span>
          <div className="flex flex-col lg:gap-2">
            <label
              className={` ${styles.sectionHeadText} font-["Montserrat"] font-bold mb-1`}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Your email..."
              {...register("email", {
                required: { value: true, message: "Email is required" },
              })}
              className="border border-gray-300 textgray 2xl:text-md xl:text-md lg-text-md text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 2xl:p-2.5 sm:p-1.5 p-1"
            />
          </div>
          <span
            className={`text-red-500 text-sm min-h-[1.25rem] ${
              errors.email ? "opacity-100" : "opacity-0"
            } transition-opacity duration-200`}
          >
            {errors.email ? errors.email.message : " "}
          </span>

          <div className="flex flex-col lg:gap-2">
            <label
              className={` ${styles.sectionHeadText} font-["Montserrat"] font-bold mb-1`}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password..."
                {...register("password", { required: "Password is required" })}
                className="border border-gray-300 textgray 2xl:text-md xl:text-md lg-text-md text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 2xl:p-2.5 sm:p-1.5 p-1"
                value={passwordValue || ""}
                onChange={(e) => {
                  formContext.setValue("password", e.target.value);
                }}
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
                    alt="Hide password"
                    className="w-auto h-6"
                  />
                ) : (
                  <img
                    src={visibilityOff}
                    alt="Show password"
                    className="w-auto h-6"
                  />
                )}
              </button>
            </div>
          </div>
          <span
            className={`text-red-500 text-sm min-h-[1.25rem] ${
              errors.password ? "opacity-100" : "opacity-0"
            } transition-opacity duration-200`}
          >
            {errors.password ? errors.password.message : " "}
          </span>
          <div className="flex flex-col lg:gap-2">
            <label
              className={` ${styles.sectionHeadText} font-["Montserrat"] font-bold mb-1`}
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password..."
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === formContext.getValues("password") ||
                    "Confirm password must match password",
                })}
                className="border border-gray-300 textgray 2xl:text-md xl:text-md lg-text-md text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 2xl:p-2.5 sm:p-1.5 p-1"
                value={confirmPasswordValue || ""}
                onChange={(e) => {
                  formContext.setValue("confirmPassword", e.target.value);
                }}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute top-[50%] right-7"
                style={{ transform: "translate(50%, -50%)" }}
              >
                {showConfirmPassword ? (
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
          </div>
          <span
            className={`text-red-500 text-sm min-h-[1.25rem] ${
              errors.confirmPassword ? "opacity-100" : "opacity-0"
            } transition-opacity duration-200`}
          >
            {errors.confirmPassword ? errors.confirmPassword.message : " "}
          </span>
          <div className="flex justify-between font-['Montserrat'] text-center lg:text-[1.35rem]">
            <div></div>
            <div className={`mb-2`}>
              Already have an account?
              <button
                type="button"
                onClick={() => navigate("/Signin")}
                className="underline ml-2 text-primary hover:text-primary-dark transition-colors duration-200"
              >
                Sign in!
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-around mt-4 w-full gap-6">
            <div className="relative w-full max-w-md mx-auto">
              {/* Bottom button (background layer) */}

              {/* Top button (floating on top of the bottom one) */}
              <button className="absolute top-2 left-0 w-full font-['Inter'] bg-primary-dark text-black font-bold text-[1.15rem] lg:text-[1.35rem] md:py-3 py-2 rounded-[10px] shadow-inner z-0">
                h
              </button>

              {/* Top button (main button) */}
              <button
                className={`relative z-10 w-full font-['Inter'] bg-primary text-white font-bold text-[1.15rem] lg:text-[1.35rem] md:py-3 py-2 rounded-[10px] transition-all duration-150 active:translate-y-[2px] active:shadow-inner`}
              >
                {loading ? "Loading..." : "Get Started"}
              </button>
            </div>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
