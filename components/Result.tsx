// components/Result.tsx
import Link from "next/link";
import React from "react";

interface ResultProps {
  score: number;
  onNewPractice: () => void;
}

export const Result: React.FC<ResultProps> = ({ score, onNewPractice }) => {
  return (
    <div className="flex flex-col">
      <h2>Your Score: {score}</h2>
      <button onClick={onNewPractice}>Start New Practice</button>
      <Link href="/">Back to Home</Link>
    </div>
  );
};
