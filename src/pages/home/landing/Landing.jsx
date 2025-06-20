import React from "react";
import Footer from "../../../components/Footer";
import Nav from "../../../components/Nav";
import Mission from "./Mission";
import Hero from "./Hero";
import Service from "./Service";
import { styles } from "../../../styles";
import AuthNav from "../../../components/AuthNav";
import DashBoard from "../dashboard/DashBoard";
import { useAuth } from "../../../context/authContext";
import { PulseLoader } from "react-spinners";

const Landing = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PulseLoader />
      </div>
    );
  }

  // mock user data
  const mockUser = {
    username: "mockuser",
  };

  return (
    <div className="flex flex-col justify-between min-h-screen scroll-smooth overflow-hidden">
      {user ? <AuthNav /> : <Nav />} */}
      {/* <Nav />
      {/* <AuthNav />

      <DashBoard username={mockUser.username} /> */}
      <div className={`${styles.paddingX} pt-10 lg:pt-20`}>
        {user ? (
          <DashBoard username={user.username} />
        ) : (
          <>
            <section id="home">
              <Hero />
            </section>

            <section id="missions">
              <Mission />
            </section>
            <section id="services">
              <Service />
            </section>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
