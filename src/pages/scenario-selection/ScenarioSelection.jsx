import React from "react";
import ScenarioCard from "../../components/common/ScenarioCard";
import { styles } from "../../styles";
import AuthNav from "../../components/AuthNav";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import ScenarioGrid from "../../components/common/ScenarioGrid";
const ScenarioTopics = {
  "introduce-yourself": {
    title: "Introducing yourself professionally",
    description:
      "Practice giving a short, confident introduction during an interview. Share your name, background, and interests in a job-friendly way.",
    difficulty: 1,
  },
  "describe-strengths": {
    title: "Describing your strengths with examples",
    description:
      "Talk about your strengths and give real examples of when you used them successfully.",
    difficulty: 1,
  },
  "challenge-you-overcame": {
    title: "Answering 'Tell me about a challenge you overcame'",
    description:
      "Explain a problem you faced and how you solved it to show resilience and problem-solving.",
    difficulty: 2,
  },
  "job-fit-explanation": {
    title: "Explaining why you're a good fit for this job",
    description:
      "Practice explaining how your skills match the job you're applying for.",
    difficulty: 3,
  },
  "ask-interview-questions": {
    title: "Asking thoughtful questions at the end of an interview",
    description:
      "Prepare polite, smart questions to ask the interviewer to show you're interested and prepared.",
    difficulty: 1,
  },
  "meet-classmate-lunch": {
    title: "Meeting a new classmate during lunch",
    description:
      "Practice introducing yourself and making small talk with someone sitting near you in the cafeteria.",
    difficulty: 2,
  },
  "ask-teacher-help": {
    title: "Asking the teacher for help after class",
    description:
      "Learn how to politely ask your teacher questions when you're confused or need support.",
    difficulty: 3,
  },
  "join-group-project": {
    title: "Joining a group project and offering your ideas",
    description:
      "Practice joining a team and contributing your thoughts respectfully and clearly.",
    difficulty: 4,
  },
  "small-talk-before-class": {
    title: "Starting small talk before class begins",
    description:
      "Learn how to talk casually with classmates before class starts to build connections.",
    difficulty: 2,
  },
  "resolve-disagreement-classmate": {
    title: "Resolving a disagreement with a classmate politely",
    description:
      "Practice expressing your point of view calmly and finding a solution when you disagree.",
    difficulty: 4,
  },
};
const ScenarioSelection = () => {
  const user = { name: "abc" };

  return (
    <div className="min-h-screen pt-[150px]">
      {user ? <AuthNav /> : <Nav />}

      <div className="mb-[50px]">
        <div className="flex flex-col justify-center items-center text-black px-4 text-center">
          <div className={`${styles.headerText} text-primary-dark`}>
            Scenario Selection
          </div>
          <div className={`${styles.headerSubText} text-primary`}>
            Choose a social scenario to practice!
          </div>
        </div>

        <ScenarioGrid scenarioTopics={ScenarioTopics} />
      </div>

      <Footer />
    </div>
  );
};

export default ScenarioSelection;
