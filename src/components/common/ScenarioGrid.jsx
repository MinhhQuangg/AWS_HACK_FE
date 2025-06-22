import React from "react";
import ScenarioCard from "./ScenarioCard";
import { styles } from "../../styles";

const ScenarioGrid = ({ scenarioTopics }) => {
  return (
    <div className={`${styles.paddingX} py-5 overflow-hidden`}>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-8">
        {Object.entries(scenarioTopics).map(([key, scenario]) => (
          <ScenarioCard
            key={key}
            title={scenario.title}
            description={scenario.description}
            difficulty={scenario.difficulty}
          />
        ))}
      </div>
    </div>
  );
};

export default ScenarioGrid;
