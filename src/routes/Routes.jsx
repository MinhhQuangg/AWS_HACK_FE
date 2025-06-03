import {
  BrowserRouter,
  Route,
  Routes as RouteComponent,
} from "react-router-dom";
import Conversation from "../pages/conversation/Conversation";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { AuthProvider } from "../context/authContext";
import Landing from "../pages/home/landing/Landing";
import Feedback from "../pages/Feedback";

export const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteComponent>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/feedback" element={<Feedback />} />
        </RouteComponent>
      </AuthProvider>
    </BrowserRouter>
  );
};
