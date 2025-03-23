import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { incrementCorrect, incrementWrong } from "../../store/flashcardSlice";
import CustomButton from "../Common/Components/CustomButton";
import confetti from "canvas-confetti"; // 🎉 Import confetti

interface ChoicesPanelProps {
  correctAnswer: string;
  choicesLength: number;
  totalAnsweredQuestion: number;
  totalQuestions: number;
  onNext: () => void;
  onSkip: () => void; // NEW PROP 🚀
}

const ChoicesPanel: React.FC<ChoicesPanelProps> = ({ correctAnswer, choicesLength, totalAnsweredQuestion, totalQuestions, onNext, onSkip }) => {
  const dispatch = useDispatch();
  const autoSubmit = useSelector((state: RootState) => state.flashcard.enabled);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [hasChecked, setHasChecked] = useState<boolean>(false); // Prevents multiple checks

  const choices = Array.from({ length: choicesLength }, (_, i) => String.fromCharCode(65 + i));

  const isLast = totalQuestions - totalAnsweredQuestion === 1;

  const handleSelect = (choice: string) => {
    if (isSubmitted) return;
    setSelectedChoice((prevChoice) => (prevChoice === choice ? null : choice));
    setHasChecked(false);
  };

  const handleSubmit = () => {
    if (!selectedChoice || hasChecked) return;
    setIsSubmitted(true);
    setHasChecked(true);

    if (selectedChoice === correctAnswer.toUpperCase().trim()) {
      dispatch(incrementCorrect());
      triggerConfetti();
    } else {
      dispatch(incrementWrong());
    }
  };

  const triggerConfetti = () => {
    const confettiSettings = {
      particleCount: 500,
      spread: 150,
      startVelocity: 50,
      colors: ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#ffffff"],
      ticks: 300,
    };

    confetti({ ...confettiSettings, origin: { x: 0, y: 0.3 } });
    confetti({ ...confettiSettings, origin: { x: 1, y: 0.3 } });
  };

  const handleNext = () => {
    onNext();
    resetState();
  };

  const handleSkip = () => {
    onSkip();
    resetState();
  };

  const resetState = () => {
    setSelectedChoice(null);
    setIsSubmitted(false);
    setHasChecked(false);
  };

  useEffect(() => {
    if (autoSubmit && selectedChoice && !hasChecked) {
      handleSubmit();
    }
  }, [selectedChoice, autoSubmit]);

  return (
    <div className="fixed bottom-0 w-full flex flex-col">
      <div className="container mx-auto max-w-4xl flex justify-end space-x-2 p-2">
        {!isSubmitted && selectedChoice && !autoSubmit && (
          <CustomButton text="Submit" className="bg-green-600 text-white hover:bg-green-700" onClick={handleSubmit} />
        )}
        {isSubmitted ? (
          <CustomButton text="Next" className="bg-gray-700 text-white hover:bg-gray-600" onClick={handleNext} />
        ) : (
          !isLast && (
            <CustomButton text="Skip" className="bg-gray-700 text-white hover:bg-gray-600" onClick={handleSkip} />
          )
        )}
      </div>

      <div className="mt-auto w-full bg-white shadow-lg py-4 border-t">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="overflow-x-auto whitespace-nowrap scrollbar-hide flex justify-center items-center space-x-2">
            {choices.map((choice) => {
              const isCorrect = choice === correctAnswer.toUpperCase().trim();
              const isSelected = choice === selectedChoice;

              let bgColor = "bg-gray-400 sm:hover:bg-gray-600 text-white";
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
                    isSelected && !isSubmitted ? "border-4 border-gray-500 bg-gray-700" : ""
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
