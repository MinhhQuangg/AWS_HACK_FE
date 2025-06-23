import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  showToastError,
  showToastSuccess,
} from "../../components/common/ShowToast";
const ScenarioTipsAndPhrases = {
  "introduce-yourself": {
    context: {
      situation: "Professional interview introduction",
      goal: "Make strong first impression",
      setting: "Interview or networking event",
    },
    tips: [
      "Speak clearly and confidently",
      "Keep it brief and focused",
      "Mention your relevant experience",
      "Maintain good posture and eye contact",
      "Practice your introduction beforehand",
    ],
    phrases: [
      "Hello, my name is...",
      "I’m excited to be here today",
      "I have experience in...",
      "Nice to meet you!",
      "I’ve recently worked on projects involving...",
    ],
  },

  "describe-strengths": {
    context: {
      situation: "Discuss job-related strengths",
      goal: "Showcase skills effectively",
      setting: "Job interview or presentation",
    },
    tips: [
      "Choose strengths relevant to the role",
      "Give specific examples",
      "Be honest and confident",
      "Explain how your strengths helped in past situations",
      "Quantify results where possible",
    ],
    phrases: [
      "One of my strengths is...",
      "For example, when I...",
      "I am skilled at...",
      "This helped me to...",
      "I excel in managing multiple tasks efficiently.",
    ],
  },

  "challenge-you-overcame": {
    context: {
      situation: "Describe personal challenge",
      goal: "Show problem-solving skills",
      setting: "Interview or discussion",
    },
    tips: [
      "Describe the challenge clearly",
      "Focus on your actions to solve it",
      "Highlight skills like problem-solving and perseverance",
      "Keep a positive attitude throughout",
      "Emphasize what you learned from the experience",
    ],
    phrases: [
      "I faced a challenge when...",
      "To overcome this, I...",
      "This experience taught me...",
      "As a result, I was able to...",
      "Initially, the situation was difficult because...",
    ],
  },

  "job-fit-explanation": {
    context: {
      situation: "Explain job suitability",
      goal: "Align skills with role",
      setting: "Interview or application",
    },
    tips: [
      "Study the job description carefully",
      "Match your skills to the requirements",
      "Provide examples of past relevant experience",
      "Show enthusiasm for the role and company",
      "Demonstrate understanding of company mission and values",
    ],
    phrases: [
      "I believe I am a good fit because...",
      "My experience with... matches the job needs",
      "I am excited to contribute by...",
      "I align well with the company values...",
      "My background in... makes me uniquely qualified for this role.",
    ],
  },

  "ask-interview-questions": {
    context: {
      situation: "Interview questions for employer",
      goal: "Show interest and preparation",
      setting: "End of interview",
    },
    tips: [
      "Prepare questions in advance",
      "Ask about company culture and growth",
      "Avoid questions about salary initially",
      "Be polite and listen carefully",
      "Tailor questions based on interview discussion",
    ],
    phrases: [
      "Can you tell me more about the team?",
      "What are the biggest challenges in this role?",
      "How do you measure success here?",
      "What opportunities for growth are available?",
      "How would you describe the company culture?",
    ],
  },

  "meet-classmate-lunch": {
    context: {
      situation: "Meeting new classmate informally",
      goal: "Start friendly conversation",
      setting: "Lunch or casual setting",
    },
    tips: [
      "Be friendly and approachable",
      "Ask open-ended questions",
      "Share a little about yourself",
      "Be a good listener",
      "Smile and use positive body language",
    ],
    phrases: [
      "Hi, I’m [Name], what’s your name?",
      "What classes are you taking?",
      "Have you tried the food here?",
      "Do you want to sit together sometime?",
      "What do you think about the professor?",
    ],
  },

  "ask-teacher-help": {
    context: {
      situation: "Requesting help from teacher",
      goal: "Get academic assistance politely",
      setting: "After class or office hours",
    },
    tips: [
      "Be polite and respectful",
      "Ask specific questions",
      "Show that you tried first on your own",
      "Thank them for their time",
      "Be clear about what you don’t understand",
    ],
    phrases: [
      "Excuse me, could you help me understand...",
      "I’m having trouble with...",
      "Could you please explain this part again?",
      "Thank you so much for your help!",
      "I tried solving this problem by..., but I’m stuck.",
    ],
  },

  "join-group-project": {
    context: {
      situation: "Collaborating on group project",
      goal: "Contribute and cooperate effectively",
      setting: "Classroom or team environment",
    },
    tips: [
      "Listen carefully to existing ideas",
      "Be respectful when sharing your opinions",
      "Offer to take responsibility for tasks",
      "Encourage collaboration and communication",
      "Be open to compromise",
    ],
    phrases: [
      "I’d like to suggest...",
      "What if we tried...",
      "I can help with...",
      "Let’s make sure everyone agrees on...",
      "Maybe we can divide the tasks like this...",
    ],
  },

  "small-talk-before-class": {
    context: {
      situation: "Casual chat before class starts",
      goal: "Build rapport with classmates",
      setting: "Classroom or hallway",
    },
    tips: [
      "Start with a friendly greeting",
      "Ask about their weekend or interests",
      "Keep topics light and positive",
      "Be attentive and responsive",
      "Avoid controversial or heavy topics",
    ],
    phrases: [
      "Hey, how was your weekend?",
      "Did you understand the last assignment?",
      "Are you ready for today’s class?",
      "I like your backpack/shoes!",
      "Have you heard about the upcoming event?",
    ],
  },

  "resolve-disagreement-classmate": {
    context: {
      situation: "Handling conflict with a peer",
      goal: "Find peaceful resolution",
      setting: "Classroom or study area",
    },
    tips: [
      "Stay calm and avoid blaming",
      "Use 'I' statements to express feelings",
      "Listen actively to their perspective",
      "Seek a compromise or solution",
      "Thank them for discussing it with you",
    ],
    phrases: [
      "I see your point, but I think...",
      "Can we find a way to agree on this?",
      "I feel that...",
      "Let’s work together to solve this.",
      "Maybe we can look at it from another angle.",
    ],
  },
};

const LeftSidebar = ({
  showLeftSidebar,
  setShowLeftSidebar,
  transcript,
  notes,
  setNotes,
  scenario,
}) => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  // const handleEndSession = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/api/feedbacks/${sessionId}`
  //     );
  //     console.log("Feedback:", response?.data?.feedback?.feedback);
  //     showToastSuccess("Session ended. Feedback fetched!");
  //   } catch (error) {
  //     console.error("Failed to fetch feedback:", error);
  //     showToastError("Failed to fetch session feedback.");
  //   }
  // };
  // const handleEndSession = () => {
  //   showToastSuccess("Session ended. Feedback fetched!");
  //   navigate("/");
  // };
  const handleEndSession = async () => {
    try {
      // const response = await axios.get(
      //   `http://localhost:5000/api/feedbacks/${sessionId}`
      // );
      // console.log("Feedback:", response?.data?.feedback?.feedback);
      // showToastSuccess("Your feedback is generated. Please wait!");
      // setNotes(response?.data?.feedback?.feedback);
      // speakText(response?.data?.feedback?.feedback);
      navigate(`/feedback/${sessionId}`);
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
      showToastError("Failed to fetch session feedback.");
    }
  };
  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-secondary transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-0
        ${
          showLeftSidebar
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
      style={{ top: "100px", height: "calc(100vh - 100px)" }}
    >
      <div className="p-4 sm:p-6 text-white h-full overflow-y-auto overflow-x-hidden">
        {/* Mobile Close Button */}
        <button
          onClick={() => setShowLeftSidebar(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg"
        >
          <CloseIcon />
        </button>

        <ScenarioSection scenario={scenario} />
        <ContextSection scenario={scenario} />
        {transcript && <TranscriptSection transcript={transcript} />}
        <NotesSection
          notes={notes}
          setNotes={setNotes}
          // handleFeedback={handleFeedback}
        />
        <TipsSection scenario={scenario} />
        <CommonPhrasesSection scenario={scenario} />
        <button
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          onClick={handleEndSession}
        >
          End your session
        </button>
      </div>
    </div>
  );
};

const CloseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const ScenarioSection = ({ scenario }) => (
  <div className="mb-6 sm:mb-8">
    <h2 className="text-xl sm:text-2xl font-bold mb-2 underline">Scenario:</h2>
    <p className="text-base sm:text-lg">
      {scenario &&
        scenario
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
    </p>
  </div>
);

const ContextSection = ({ scenario }) => {
  const context = ScenarioTipsAndPhrases[scenario]?.context;

  if (!context) {
    return (
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-bold mb-4 underline">
          Context:
        </h3>
        <p>No context available for this scenario.</p>
      </div>
    );
  }

  return (
    <div className="mb-6 sm:mb-8">
      <h3 className="text-lg sm:text-xl font-bold mb-4 underline">Context:</h3>
      <div className="space-y-1 text-sm sm:text-base">
        <p>
          <strong>Situation:</strong> {context.situation}
        </p>
        <p>
          <strong>Goal:</strong> {context.goal}
        </p>
        <p>
          <strong>Setting:</strong> {context.setting}
        </p>
      </div>
    </div>
  );
};

const TranscriptSection = ({ transcript }) => (
  <div className="mb-6 sm:mb-8">
    <h3 className="text-lg sm:text-xl font-bold mb-4 underline">
      Last Transcript:
    </h3>
    <div className="bg-white/10 p-3 rounded-lg">
      <p className="text-sm sm:text-base">{transcript}</p>
    </div>
  </div>
);

const NotesSection = ({ notes, setNotes }) => (
  <div className="mb-6 sm:mb-8">
    <h3 className="text-lg sm:text-xl font-bold mb-4 underline">Your Notes</h3>
    <textarea
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      className="w-full h-24 sm:h-32 p-3 bg-white text-black rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-highlight text-sm sm:text-base"
      placeholder="Type in your notes"
    />
    {/* <button
      className=" w-full mt-4 bg-primary text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      onClick={handleFeedback}
    >
      Show Feedback
    </button> */}
  </div>
);

const TipsSection = ({ scenario }) => {
  const tips = ScenarioTipsAndPhrases[scenario]?.tips || [];

  return (
    <div className="mb-6 sm:mb-8">
      <h3 className="text-lg sm:text-xl font-bold mb-4 underline">Tips:</h3>
      <div className="space-y-2 text-sm sm:text-base">
        {tips.length > 0 ? (
          tips.map((tip, index) => <p key={index}>• {tip}</p>)
        ) : (
          <p>No tips available for this scenario.</p>
        )}
      </div>
    </div>
  );
};

const CommonPhrasesSection = ({ scenario }) => {
  const phrases = ScenarioTipsAndPhrases[scenario]?.phrases || [];

  return (
    <div className="mb-6 sm:mb-8">
      <h3 className="text-lg sm:text-xl font-bold mb-4 underline">
        Common Phrases:
      </h3>
      <div className="space-y-2 text-sm sm:text-base">
        {phrases.length > 0 ? (
          phrases.map((phrase, index) => <p key={index}>"{phrase}"</p>)
        ) : (
          <p>No phrases available for this scenario.</p>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
