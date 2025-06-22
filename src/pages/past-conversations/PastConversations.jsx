import React from "react";
import ScenarioCard from "../../components/common/ScenarioCard";
import { styles } from "../../styles";
import AuthNav from "../../components/AuthNav";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import ScenarioGrid from "../../components/common/ScenarioGrid";

const PastConversations = () => {
  const user = { name: "abc" };

  return (
    <div className="min-h-screen pt-[150px]">
      {user ? <AuthNav /> : <Nav />}

      <div className="mb-[50px]">
        <div className="flex flex-col justify-center items-center text-black px-4 text-center">
          <div className={`${styles.headerText} text-primary-dark`}>
            Past Conversations
          </div>
          <div className={`${styles.headerSubText} text-primary`}>
            Review your past conversations
          </div>
        </div>

        {/* <ScenarioGrid array={Array.from({ length: 6 })} /> */}
      </div>

      <Footer />
    </div>
  );
};

export default PastConversations;
