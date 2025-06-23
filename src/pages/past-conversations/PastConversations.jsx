import React, { useEffect } from "react";
import ScenarioCard from "../../components/common/ScenarioCard";
import { styles } from "../../styles";
import AuthNav from "../../components/AuthNav";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import ScenarioGrid from "../../components/common/ScenarioGrid";
import { useState } from "react";
const mockSessions = [
  {
    id: "0",
    title: "Introducing yourself professionally",
    description:
      "Practice giving a short, confident introduction during an interview.",
    feedback:
      "Your introduction is clear and confident, which sets a positive tone for professional interactions.Consider adding a brief mention of your role or expertise to give more context about your background.Try to maintain a friendly yet formal tone to make a strong first impression.",
    date: "2025-06-23",
  },
  {
    id: "1",
    title: "Introducing yourself professionally",
    description:
      "Practice giving a short, confident introduction during an interview.",
    feedback:
      "You demonstrated great confidence in your introduction, which is key to making a positive first impression during interviews. To improve even further, try to slow your speech a little bit to ensure clarity and help the listener absorb your message better. Adding a brief overview of your current role or area of expertise can also provide helpful context. Finally, maintain a balance between professionalism and friendliness to come across as approachable yet competent.",
    date: "2025-06-20",
  },
  {
    id: "2",
    title: "Describing your strengths",
    description: "Talk about your strengths and real examples.",
    feedback:
      "You did a good job providing concrete examples to illustrate your strengths, which makes your claims more believable and relatable. To strengthen your answer, consider adding more details about how you collaborate with others, especially in team settings. Highlight specific instances where your teamwork made a difference and how you contributed to achieving a common goal. This will showcase not only your individual skills but also your ability to work well within a group.",
    date: "2025-06-18",
  },
  {
    id: "3",
    title: "Answering challenge question",
    description:
      "Explain a problem you faced and how you solved it to show resilience.",
    feedback:
      "Your ability to describe a challenge and your approach to solving it shows strong problem-solving skills and resilience, which are highly valued traits. To make your response even more impactful, focus on improving the clarity of your explanation. Break down the problem and solution into clear, easy-to-follow steps, and avoid overly technical or complex language unless necessary. This will ensure your listener fully understands the situation and your valuable contribution.",
    date: "2025-06-15",
  },
  {
    id: "4",
    title: "Explaining job fit",
    description: "Explain how your skills match the job.",
    feedback:
      "You conveyed a general understanding of how your skills match the job requirements, which is a good start. However, try to be more specific by citing concrete examples of your past experiences that directly relate to the key responsibilities of the position. Demonstrating a clear connection between your abilities and what the job demands will make your fit more convincing and memorable to the interviewer.",
    date: "2025-06-10",
  },
  {
    id: "5",
    title: "Asking interview questions",
    description: "Prepare polite, smart questions for the interviewer.",
    feedback:
      "You prepared some thoughtful questions, which shows your interest in the role and company. To take this a step further, try to ask more questions about the company culture, team dynamics, and opportunities for growth. These types of questions indicate you are thinking about how you will fit within the organization long-term and can help you gather information to determine if the company is the right place for you.",
    date: "2025-06-08",
  },
  {
    id: "6",
    title: "Meeting classmate during lunch",
    description: "Practice introducing yourself and making small talk.",
    feedback:
      "You used a friendly and approachable tone, which is great for casual conversations like meeting classmates. To enhance your small talk skills, try to incorporate more open-ended questions that invite your conversation partner to share more about themselves. This can lead to richer discussions and help build stronger connections. Also, showing genuine interest in their responses will make your interactions feel more natural and engaging.",
    date: "2025-06-05",
  },
];

const SessionCard = ({ session }) => {
  return (
    <div className="relative w-full group cursor-pointer h-full mb-6">
      {/* Shadow layer */}
      <div className="absolute inset-0 bg-buttonshadow rounded-xl translate-y-2 transition-transform duration-150" />

      {/* Main Card */}
      <div className="relative bg-white rounded-xl border-2 border-buttonshadow p-6 flex flex-col gap-3 transition-all duration-150 group-active:translate-y-2 h-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black font-heading">
            {session.title}
          </h2>
          <span className="text-sm text-gray-500">{session.date}</span>
        </div>

        <p className="text-base text-textgray-dark font-body leading-relaxed">
          {session.description}
        </p>

        <div className="bg-gray-100 p-3 rounded border border-gray-300">
          <strong>Feedback:</strong>
          <p className="mt-1 text-sm text-gray-700">{session.feedback}</p>
        </div>
      </div>
    </div>
  );
};
const PastConversations = () => {
  const user = { name: "abc" }; // replace with auth context in real app
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockSessions.length / itemsPerPage);

  const currentSessions = mockSessions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  useEffect(() => {});
  return (
    <div className="flex flex-col min-h-screen justify-between pt-[150px]">
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

        <div className={`${styles.paddingX} py-5 overflow-hidden px-4 sm:px-8`}>
          {currentSessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="flex items-center font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PastConversations;
