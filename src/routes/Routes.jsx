import {
  BrowserRouter,
  Route,
  Routes as RouteComponent,
} from "react-router-dom";
import Home from "../pages/Home";
import Conversation from "../pages/conversation/Conversation";

export const Routes = () => {
  return (
    <BrowserRouter>
      <RouteComponent>
        <Route path="/" element={<Home />} />
        <Route path="/conversation" element={<Conversation />} />
      </RouteComponent>
    </BrowserRouter>
  );
};
