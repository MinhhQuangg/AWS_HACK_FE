import React from "react";
import "./index.css";
import { Routes } from "./routes/Routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CLIENT_ID =
  "275407016033-3v0na8sqo6n420e74ak2mlule5i24330.apps.googleusercontent.com";
function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <Routes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          drggable
          pauseOnHover
          theme="colored"
        />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
