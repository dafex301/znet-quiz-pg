// components/Result.tsx
import React from "react";
import Link from "next/link";

interface ResultProps {
  score: number;
  onNewPractice: () => void;
}

export const Result: React.FC<ResultProps> = ({ score, onNewPractice }) => {
  return (
    <div className="bg-white p-6 text-center">
      <p className="text-3xl font-semibold text-purple-600 mb-4">Your Score: {score}</p>
      <div className="mb-4"> {/* Add margin bottom to create space between text and buttons */}
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-all"
          onClick={onNewPractice}
        >
          Start New Practice
        </button>
      </div>
      <Link href="/" className="px-4 py-2 rounded-full hover:bg-gray-200 text-gray-800 transition-all border-2 border-gray-200">Back to Home</Link>
    </div>
  );
};
