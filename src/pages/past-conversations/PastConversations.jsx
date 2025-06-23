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
    id: "1",
    title: "Introducing yourself professionally",
    description:
      "Practice giving a short, confident introduction during an interview.",
    feedback: "Great confidence shown, try to slow down a bit.",
    date: "2025-06-20",
  },
  {
    id: "2",
    title: "Describing your strengths",
    description: "Talk about your strengths and real examples.",
    feedback: "Good examples, add more details on teamwork.",
    date: "2025-06-18",
  },
  {
    id: "3",
    title: "Answering challenge question",
    description:
      "Explain a problem you faced and how you solved it to show resilience.",
    feedback: "Strong problem-solving skills, improve clarity.",
    date: "2025-06-15",
  },
  {
    id: "4",
    title: "Explaining job fit",
    description: "Explain how your skills match the job.",
    feedback: "Try to be more specific with examples.",
    date: "2025-06-10",
  },
  {
    id: "5",
    title: "Asking interview questions",
    description: "Prepare polite, smart questions for the interviewer.",
    feedback: "Good questions, but ask more about company culture.",
    date: "2025-06-08",
  },
  {
    id: "6",
    title: "Meeting classmate during lunch",
    description: "Practice introducing yourself and making small talk.",
    feedback: "Friendly tone, try to ask open-ended questions.",
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
