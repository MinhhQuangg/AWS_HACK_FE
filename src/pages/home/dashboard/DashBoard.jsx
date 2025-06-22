import React, { useEffect, useState } from "react";
import { styles } from "../../../styles";
import { AIAvatar } from "../../../assets/styles";
import { useNavigate } from "react-router-dom";
import { showToastError } from "../../../components/common/ShowToast";
import axios from "axios";

const DashBoard = ({ username, userId }) => {
  const navigate = useNavigate();

  const [allScenario, setAllScenario] = useState([]);
  useEffect(() => {
    const fetchLastScenario = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sessions/${userId}`
        );
        setAllScenario(response?.data);
      } catch (err) {
        showToastError(err.message || "Failed to fetch scenarios");
      }
    };

    fetchLastScenario();
  }, [userId]);

  return (
    <div className="grid grid-cols-3 lg:h-screen md:h-[80vh] sm:h-[60vh] h-[40vh] items-center justify-items-center gap-4">
      <div className="col-span-1 flex items-center justify-center">
        <img
          src={AIAvatar}
          key="Avatar"
          className="2xl:w-[660px] 2xl:h-[660px] xl:w-[660px] xl:h-[660px] lg:w-[500px] lg:h-[500px] md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[300px] w-[200px] h-[200px] object-cover"
        />
      </div>
      <div className="col-span-2 flex flex-col items-center justify-center xl:gap-8 gap-2">
        {allScenario.length != 0 ? (
          <div className="flex flex-col gap-3">
            <div
              className={`${styles.headerText} text-center text-primary-dark`}
            >
              Welcome back,
            </div>
            <div
              className={`${styles.headerText} text-center text-primary-dark`}
            >
              {username}
            </div>
            <div
              className={`${styles.headerSubText} flex gap-12 font-['Fredoka]`}
            >
              <div className="flex flex-col">
                <div className="text-textgray-dark underline mb-2">
                  Last Scenario:
                </div>
                <div className="text-third text-center">
                  {allScenario[0]?.scenarioId
                    ?.split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="text-textgray-dark underline mb-2">
                  Total Scenarios:
                </div>
                <div className="text-third text-center">
                  {allScenario ? allScenario.length : "Loading..."}
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex w-full justify-around">
              <div className="relative w-[80%] max-w-md mx-auto">
                {/* Bottom button (background layer) */}

                {/* Top button (floating on top of the bottom one) */}
                <button className="absolute top-2 left-1/2 -translate-x-1/2 w-[70%] font-['Inter'] bg-primary-dark text-black font-bold text-[1.15rem] lg:text-[1.35rem] md:py-3 py-1 rounded-[10px] shadow-inner z-0">
                  h
                </button>

                {/* Top button (main button) */}
                <button
                  className="relative z-10 left-1/2 -translate-x-1/2 w-[70%] font-['Fredoka One'] bg-primary text-white font-bold text-[1.15rem] lg:text-[1.35rem] md:py-3 py-1 rounded-[10px] transition-all duration-150 active:translate-y-[2px] active:shadow-inner"
                  onClick={() => {
                    navigate("/scenarios");
                  }}
                >
                  Get Started
                </button>
              </div>
              <div className="relative w-[80%] max-w-md mx-auto flex">
                {/* Bottom button (background layer) */}

                {/* Top button (floating on top of the bottom one) */}
                <button className="absolute top-2 left-1/2 -translate-x-1/2 w-[70%] font-['Inter'] bg-shadowHighlight text-black font-bold text-[1.15rem] lg:text-[1.35rem] md:py-3 py-1 rounded-[10px] shadow-inner z-0">
                  h
                </button>

                {/* Top button (main button) */}
                <button
                  className="relative z-10 left-1/2 -translate-x-1/2 w-[70%] font-['Fredoka One'] bg-highlight text-primary-dark font-bold text-[1.15rem] lg:text-[1.35rem] md:py-3 py-1 rounded-[10px] transition-all duration-150 active:translate-y-[2px] active:shadow-inner"
                  onClick={() => {
                    navigate("/history");
                  }}
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Top button (main button) */}
            <div
              className={`${styles.headerText} text-center text-primary-dark`}
            >
              Welcome,
            </div>
            <div
              className={`${styles.headerText} text-center text-primary-dark`}
            >
              {username}
            </div>
            <button
              className="w-full font-['Fredoka One'] bg-primary text-white font-bold text-[1.5rem] lg:text-[2rem] px-2 py-3  rounded-xl transition-all duration-150 active:translate-y-[2px] active:shadow-inner"
              onClick={() => {
                navigate("/scenarios");
              }}
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
