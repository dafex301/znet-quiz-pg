// components/LeaveConfirmation.tsx
import React from "react";

interface LeaveConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const LeaveConfirmation: React.FC<LeaveConfirmationProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="absolute top-0 left-0 h-screen w-full  flex justify-center items-center">
      <div
        onClick={onCancel}
        className="absolute z-0 bg-black opacity-30 h-screen w-full"
      ></div>
      <div className="z-10 bg-white rounded-lg p-5">
        <h2>Are you sure you want to leave?</h2>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};
