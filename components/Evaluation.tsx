// components/Evaluation.tsx
import React from "react";

interface EvaluationProps {
  correctAnswer: string;
  answerSubmitted: string;
}

export const Evaluation: React.FC<EvaluationProps> = ({
  correctAnswer,
  answerSubmitted,
}) => {
  const isCorrect = correctAnswer === answerSubmitted;

  // Define a CSS class based on the correctness of the answer
  const textClass = isCorrect ? "text-green-500" : "text-red-500";

  const textIsCorrect = isCorrect ? "Benar!" : "Salah!";

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <p className="text-lg font-semibold mb-4">Evaluation</p>
      <p className={`text-lg font-semibold mb-4 ${textClass}`}>{textIsCorrect}</p>
      <div className="mb-4">
        <p className="text-lg">Your answer:</p>
        <p className={`text-lg ${textClass}`}>{answerSubmitted}</p>
      </div>
      <div>
        <p className="text-lg">Correct answer:</p>
        <p className="text-lg">{correctAnswer}</p>
      </div>
    </div>
  );
};
