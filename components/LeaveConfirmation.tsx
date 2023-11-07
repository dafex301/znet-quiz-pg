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
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div
        onClick={onCancel}
        className="bg-black opacity-40 w-full h-screen absolute top-0 left-0 z-0"
      ></div>
      <div className="bg-white p-4 border rounded shadow-md z-10">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to leave?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-all"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 rounded-full hover:bg-gray-200 text-gray-800 transition-all border-2 border-gray-200"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
