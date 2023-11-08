import React from "react";

interface ResultProps {
  score: number;
  onNewPractice: () => void;
}

export const Result: React.FC<ResultProps> = ({ score, onNewPractice }) => {
  return (
    <div className="bg-white p-6 text-center">
      <p className="text-3xl font-semibold text-purple-600 mb-4">Your Score: {score}</p>
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-all"
        onClick={onNewPractice}
      >
        Start New Practice
      </button>
    </div>
  );
};
