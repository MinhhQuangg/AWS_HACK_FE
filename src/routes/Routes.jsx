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
import ScenarioSelection from "../pages/scenario-selection/ScenarioSelection";
import PastConversations from "../pages/past-conversations/PastConversations";

export const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteComponent>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/conversation/:sessionId" element={<Conversation />} />
          <Route path="/scenarios" element={<ScenarioSelection />} />
          <Route path="/history" element={<PastConversations />} />
          <Route path="/feedback/:sessionId" element={<Feedback />} />
        </RouteComponent>
      </AuthProvider>
    </BrowserRouter>
  );
};
