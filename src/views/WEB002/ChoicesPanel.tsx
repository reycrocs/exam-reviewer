import React, { useState } from "react";
import CustomButton from "../Common/Components/CustomButton";

interface ChoicesPanelProps {
  correctAnswer: string;
  choicesLength: number;
  onSkip: () => void;
}

const ChoicesPanel: React.FC<ChoicesPanelProps> = ({ correctAnswer, choicesLength, onSkip }) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Generate choice letters dynamically (A, B, C, D, ...)
  const choices = Array.from({ length: choicesLength }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  // Handle choice selection (allows deselection)
  const handleSelect = (choice: string) => {
    if (isSubmitted) return;
    setSelectedChoice((prevChoice) => (prevChoice === choice ? null : choice));
  };

  // Handle submission
  const handleSubmit = () => {
    if (selectedChoice) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="fixed bottom-0 w-full flex flex-col">
      {/* Buttons - Positioned Above on the Right */}
      <div className="container mx-auto max-w-4xl flex justify-end space-x-2 p-2">
        {!isSubmitted && selectedChoice && (
          <CustomButton
            text="Submit"
            className="bg-green-600 text-white hover:bg-gray-700"
            onClick={handleSubmit}
          />
        )}
        <CustomButton
          text="Skip"
          className="bg-gray-700 text-white hover:bg-gray-600"
          onClick={onSkip}
        />
      </div>

      {/* Choices Panel - Centered and Scrollable */}
      <div className="mt-auto w-full bg-white shadow-lg py-4 border-t">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="overflow-x-auto whitespace-nowrap scrollbar-hide flex justify-center items-center space-x-2">
            {choices.map((choice) => {
              const isCorrect = choice === correctAnswer;
              const isSelected = choice === selectedChoice;

              let bgColor = "bg-gray-400 sm:hover:bg-gray-600";
              if (isSelected && isSubmitted) {
                bgColor = isCorrect ? "bg-green-500" : "bg-red-500";
              }
              if (!isSelected && selectedChoice && isCorrect && isSubmitted) {
                bgColor = "bg-green-500";
              }

              return (
                <button
                  key={choice}
                  className={`flex items-center justify-center w-10 h-10 rounded-md
                      text-xs sm:text-sm font-semibold transition duration-300 ease-in-out ${bgColor} ${
                    isSelected && !isSubmitted ? "border-4 border-gray-500 text-gray-500" : "text-white"
                  }`}
                  onClick={() => handleSelect(choice)}
                  disabled={isSubmitted}
                >
                  {choice}
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChoicesPanel;
