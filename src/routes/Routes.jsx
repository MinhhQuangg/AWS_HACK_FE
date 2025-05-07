import {
  BrowserRouter,
  Route,
  Routes as RouteComponent,
} from "react-router-dom";
import Home from "../pages/Home";

export const Routes = () => {
  return (
    <BrowserRouter>
      <RouteComponent>
        <Route path="/" element={<Home />} />
      </RouteComponent>
    </BrowserRouter>
  );
  s;
};
