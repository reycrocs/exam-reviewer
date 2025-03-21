import React from "react";

interface InstructionsProps {
  instruction: string;
}

const Instructions: React.FC<InstructionsProps> = ({ instruction }) => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 md:p-6 mb-6 rounded-lg shadow-sm">
      <h2 className="text-lg md:text-xl font-bold text-blue-600">Instructions:</h2>
      <p className="text-gray-600 mt-2 text-sm md:text-base">{instruction}</p>
    </div>
  );
};

export default Instructions;
