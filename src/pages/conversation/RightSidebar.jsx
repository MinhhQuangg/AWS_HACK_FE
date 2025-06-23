import React from "react";
import { Volume2 } from "lucide-react";
import Button from "../../components/common/Button";
const ScenarioSuggestions = {
  "introduce-yourself": [
    { number: 1, text: "Start with a polite greeting and your name." },
    { number: 2, text: "Mention your current role or studies." },
    { number: 3, text: "Briefly explain your background." },
    { number: 4, text: "Add one or two key accomplishments." },
    { number: 5, text: "Share a career goal or interest." },
    { number: 6, text: "Smile and maintain confident body language." },
    { number: 7, text: "Keep it under 30 seconds to stay concise." },
  ],

  "describe-strengths": [
    { number: 1, text: "Think of 2–3 strengths relevant to the role." },
    { number: 2, text: "Start by naming a strength clearly." },
    { number: 3, text: "Provide a real-life example of that strength." },
    { number: 4, text: "Explain how it helped in a past situation." },
    { number: 5, text: "Use action words to describe your effort." },
    { number: 6, text: "Connect the strength to the job you're applying for." },
    { number: 7, text: "End with a confident, positive statement." },
  ],

  "challenge-you-overcame": [
    { number: 1, text: "Briefly describe a real challenge you faced." },
    { number: 2, text: "Explain why it was difficult or unexpected." },
    { number: 3, text: "Describe the actions you took to solve it." },
    { number: 4, text: "Include any teamwork or problem-solving skills." },
    { number: 5, text: "Share what you learned from the experience." },
    { number: 6, text: "Keep your tone focused and positive." },
    { number: 7, text: "End with the outcome or success achieved." },
  ],

  "job-fit-explanation": [
    { number: 1, text: "Research the job and company beforehand." },
    { number: 2, text: "List the skills they are looking for." },
    { number: 3, text: "Match your experience to those needs." },
    { number: 4, text: "Mention how your values align with theirs." },
    { number: 5, text: "Use specific examples when possible." },
    { number: 6, text: "Express enthusiasm for the role." },
    { number: 7, text: "Keep your answer organized and confident." },
  ],

  "ask-interview-questions": [
    { number: 1, text: "Thank the interviewer before asking questions." },
    { number: 2, text: "Ask about the company’s goals or values." },
    { number: 3, text: "Inquire about team culture or management style." },
    { number: 4, text: "Ask what success looks like in this role." },
    { number: 5, text: "Bring up opportunities for learning or growth." },
    { number: 6, text: "Avoid questions about salary or time off." },
    { number: 7, text: "Prepare 2–3 thoughtful questions in advance." },
  ],

  "meet-classmate-lunch": [
    { number: 1, text: "Say hello and introduce yourself with a smile." },
    { number: 2, text: "Ask if they’re new or what classes they take." },
    { number: 3, text: "Make a comment about the food or cafeteria." },
    { number: 4, text: "Ask if you can sit with them." },
    { number: 5, text: "Share a bit about yourself (hobbies, interests)." },
    { number: 6, text: "Ask them questions to keep the conversation going." },
    { number: 7, text: "Be friendly and thank them for chatting." },
  ],

  "ask-teacher-help": [
    { number: 1, text: "Wait until the teacher is free to talk." },
    { number: 2, text: "Start by thanking them for their time." },
    { number: 3, text: "Clearly explain what you need help with." },
    { number: 4, text: "Mention what you’ve tried already." },
    { number: 5, text: "Be specific with your questions." },
    { number: 6, text: "Write down any advice they give." },
    { number: 7, text: "Thank them again at the end." },
  ],

  "join-group-project": [
    { number: 1, text: "Introduce yourself to the group first." },
    { number: 2, text: "Ask what the group has discussed so far." },
    { number: 3, text: "Listen to others’ ideas before sharing yours." },
    { number: 4, text: "Offer a suggestion respectfully." },
    { number: 5, text: "Volunteer for a task you’re good at." },
    { number: 6, text: "Support and encourage others in the group." },
    { number: 7, text: "Check in to stay on the same page." },
  ],

  "small-talk-before-class": [
    { number: 1, text: "Say hello and smile." },
    { number: 2, text: "Ask how their day or weekend is going." },
    { number: 3, text: "Mention something about the class or teacher." },
    { number: 4, text: "Talk about shared assignments or tests." },
    { number: 5, text: "Give a compliment (e.g., their backpack)." },
    { number: 6, text: "Ask what they like to do for fun." },
    { number: 7, text: "Keep it light, short, and positive." },
  ],

  "resolve-disagreement-classmate": [
    { number: 1, text: "Take a deep breath and stay calm." },
    { number: 2, text: "Use ‘I’ statements to express your feelings." },
    {
      number: 3,
      text: "Listen to the other person’s side without interrupting.",
    },
    { number: 4, text: "Find common ground where possible." },
    { number: 5, text: "Offer a compromise that works for both sides." },
    { number: 6, text: "Stay respectful even if you disagree." },
    { number: 7, text: "End the conversation on a peaceful note." },
  ],
};

const RightSidebar = ({
  showRightSidebar,
  setShowRightSidebar,
  onSuggestionClick,
  scenario,
}) => {
  const suggestions = ScenarioSuggestions[scenario] || [];
  return (
    <div
      className={`
        fixed inset-y-0 right-0 z-50 w-80 bg-secondary transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-0 lg:w-80
        ${
          showRightSidebar
            ? "translate-x-0"
            : "translate-x-full lg:translate-x-0"
        }
      `}
      style={{ top: "100px", height: "calc(100vh - 100px)" }}
    >
      <div className="p-4 sm:p-6 h-full overflow-y-auto overflow-x-hidden">
        {/* Mobile Close Button */}
        <button
          onClick={() => setShowRightSidebar(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg"
        >
          <CloseIcon />
        </button>

        <AISuggestionInput />
        <SuggestionsList
          suggestions={suggestions}
          onSuggestionClick={onSuggestionClick}
        />
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

const AISuggestionInput = () => (
  <div className="mb-6 mt-8 lg:mt-0">
    <textarea
      className="w-full h-16 sm:h-20 p-3 rounded-lg bg-bg-light text-textgray-dark resize-none text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-highlight"
      placeholder="Ask AI for a suggestion on the conversation..."
    />
    <Button>AI Suggestion ✨</Button>
  </div>
);

const SuggestionsList = ({ suggestions, onSuggestionClick }) => (
  <div className="space-y-3 sm:space-y-4">
    {suggestions.map((suggestion, index) => (
      <SuggestionCard
        key={index}
        suggestion={suggestion}
        onSuggestionClick={onSuggestionClick}
      />
    ))}
  </div>
);

const SuggestionCard = ({ suggestion, onSuggestionClick }) => (
  <div
    className="bg-primary rounded-lg p-3 sm:p-4 cursor-pointer hover:bg-primary-dark transition-colors"
    onClick={() => onSuggestionClick(suggestion.text)}
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold text-sm sm:text-base">
        {suggestion.number}
      </div>
      <Volume2 className="w-4 h-4 text-white opacity-70" />
    </div>
    <p className="text-white text-sm sm:text-base">{suggestion.text}</p>
  </div>
);

export default RightSidebar;
