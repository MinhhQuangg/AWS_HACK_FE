import React from "react";
import ScenarioCard from "../../components/common/ScenarioCard";
import { styles } from "../../styles";
import AuthNav from "../../components/AuthNav";
import Nav from "../../components/Nav";

const ScenarioSelection = () => {
  const user = null;

  return (
    <div className={`${styles.paddingX} pt-[150px] flex flex-col justify-between min-h-screen scroll-smooth overflow-hidden`}>
    
      {user ? <AuthNav /> : <Nav />}
      <div className="w-full grid grid-cols-2 gap-y-4 gap-x-8 px-8">
        {Array.from({ length: 6 }).map((_, id) => {
          return <ScenarioCard key={id} />;
        })}
      </div>
    </div>
  );
};

export default ScenarioSelection;
