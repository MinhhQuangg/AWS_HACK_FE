import React from "react";
import ScenarioCard from "./ScenarioCard";
import { styles } from "../../styles";
import { showToastError, showToastSuccess } from "./ShowToast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const ScenarioGrid = ({ scenarioTopics }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleSelectScenario = async (key) => {
    try {
      const response = await axios.post("http://localhost:5000/api/sessions", {
        userId: user.id,
        scenarioId: key,
      });

      if (response.data.status === "success") {
        showToastSuccess("Session successfully creates");
        navigate(`/conversation/${response?.data?.data?.sessionId}`);
      }
    } catch (err) {
      showToastError(err.response?.data?.error);
    }
  };
  return (
    <div className={`${styles.paddingX} py-5 overflow-hidden`}>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-8">
        {Object.entries(scenarioTopics).map(([key, scenario]) => (
          <ScenarioCard
            key={key}
            title={scenario.title}
            description={scenario.description}
            difficulty={scenario.difficulty}
            symbol={scenario.symbol}
            onClick={() => handleSelectScenario(key)}
          />
        ))}
      </div>
    </div>
  );
};

export default ScenarioGrid;
