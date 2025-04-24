import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  incrementCorrect,
  incrementWrong,
  setIsSkipping,
  toggleEnded,
  toggleTryAgain,
} from "../../store/flashcardSlice";
import CustomButton from "../Common/Components/CustomButton";
import confetti from "canvas-confetti";
import {
  ChevronDown,
  ChevronUp,
  Eraser,
  Pencil,
  PencilOff,
  RotateCcw,
  Trash2,
} from "lucide-react";

interface ChoicesPanelProps {
  correctAnswer: string;
  choicesLength: number;
  totalAnsweredQuestion: number;
  totalQuestions: number;
  onNext: () => void;
  onSkip: () => void;
  // for canvas
  changeColor: (color: string) => void;
  toggleErase: (state: boolean) => void;
  handleUndo: () => void;
  handleClear: () => void;
  drawing: (enabled: boolean) => void;
}

const ChoicesPanel: React.FC<ChoicesPanelProps> = ({
  correctAnswer,
  choicesLength,
  totalAnsweredQuestion,
  totalQuestions,
  onNext,
  onSkip,
  // for canvas
  changeColor,
  toggleErase,
  handleUndo,
  handleClear,
  drawing,
}) => {
  const dispatch = useDispatch();
  const autoSubmit = useSelector((state: RootState) => state.flashcard.enabled);
  const isSkipping = useSelector(
    (state: RootState) => state.flashcard.isSkipping
  );
  const correctCount = useSelector(
    (state: RootState) => state.flashcard.correctCount
  );
  const wrongCount = useSelector(
    (state: RootState) => state.flashcard.wrongCount
  );
  const allQuestionsAnswered = totalAnsweredQuestion === totalQuestions;

  // Load initial values from localStorage
  const [selectedChoice, setSelectedChoice] = useState<string | null>(() => {
    return localStorage.getItem("selectedChoice") ?? null;
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => {
    return localStorage.getItem("isSubmitted") === "true";
  });
  const [hasChecked, setHasChecked] = useState<boolean>(() => {
    return localStorage.getItem("hasChecked") === "true";
  });

  const choices = Array.from({ length: choicesLength }, (_, i) =>
    String.fromCharCode(65 + i)
  );

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
    if (allQuestionsAnswered) {
      triggerFireworks();
    } else {
      handleClear();
      onNext();
      resetState();
    }
  };

  const handleSkip = () => {
    if (isSkipping) return;
    handleClear();
    dispatch(setIsSkipping(true));
    setTimeout(() => dispatch(setIsSkipping(false)), 200);
    onSkip();
    resetState();
  };

  const resetState = () => {
    setSelectedChoice(null);
    setIsSubmitted(false);
    setHasChecked(false);

    localStorage.removeItem("selectedChoice");
    localStorage.removeItem("isSubmitted");
    localStorage.removeItem("hasChecked");
  };

  const triggerFireworks = () => {
    dispatch(toggleEnded(true));

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
      }

      const particleCount = 30 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    setTimeout(() => {
      dispatch(toggleTryAgain(true));
    }, duration);
  };

  useEffect(() => {
    if (autoSubmit && selectedChoice && !hasChecked) {
      handleSubmit();
    }
  }, [selectedChoice, autoSubmit]);

  // Persist to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("selectedChoice", selectedChoice ?? "");
    localStorage.setItem("isSubmitted", isSubmitted.toString());
    localStorage.setItem("hasChecked", hasChecked.toString());
  }, [selectedChoice, isSubmitted, hasChecked]);

  const [showStackedButtons, setShowStackedButtons] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [showColorChoices, setShowColorChoices] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const toggleStackedButtons = () => {
    setShowStackedButtons((prevState) => !prevState);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setShowColorChoices(false); // Hide the color options after selection
  };

  return (
    <div className="fixed bottom-0 w-full flex flex-col z-20">
      <div className="container mx-auto max-w-4xl flex justify-between items-end p-2">
        {/* Bottom Left - Question Count */}
        <span className="text-sm text-gray-500">
          {totalQuestions - (correctCount + wrongCount)} questions left
        </span>

        <div className="flex flex-col items-end space-y-2">
          {/* Icon Buttons */}
          {showStackedButtons && (
            <>
              <CustomButton
                className="bg-gray-900 text-white hover:bg-gray-700"
                buttonType="circle"
                onClick={() => {
                  handleUndo();
                  toggleErase(false);
                }}
              >
                <RotateCcw size={14} />
              </CustomButton>
              <CustomButton
                className="bg-gray-900 text-white hover:bg-gray-700"
                buttonType="circle"
                onClick={() => toggleErase(true)}
              >
                <Eraser size={14} />
              </CustomButton>
              {/* Clear Button */}
              <CustomButton
                className="bg-gray-900 text-white hover:bg-gray-700"
                buttonType="circle"
                onClick={() => {
                  handleClear();
                  toggleStackedButtons();
                  toggleErase(false);
                }}
              >
                <Trash2 size={14} />
              </CustomButton>
              {/* Container for Color Picker Button and Choices */}
              <div className="relative flex flex-col items-center">
                {/* Color Picker Button */}
                <CustomButton
                  className={`p-2 text-white hover:bg-gray-700 ${
                    !isDrawing ? "bg-gray-900" : `bg-${selectedColor}`
                  }`}
                  buttonType="circle"
                  onClick={() => setShowColorChoices((prev) => !prev)}
                >
                  {isDrawing ? <Pencil size={14} /> : <PencilOff size={14} />}
                </CustomButton>

                {/* Conditionally render the color choices beside the color button (on the left) */}
                {showColorChoices && (
                  <div className="flex space-x-2 absolute top-0 right-full mr-2">
                    <CustomButton
                      className="p-2 bg-black text-white hover:bg-gray-800"
                      buttonType="circle"
                      onClick={() => {
                        handleColorSelect("black");
                        changeColor("black");
                        setIsDrawing(true);
                        drawing(true);
                        toggleStackedButtons();
                        toggleErase(false);
                      }}
                    ></CustomButton>
                    <CustomButton
                      className="p-2 bg-red-500 text-white hover:bg-red-600"
                      buttonType="circle"
                      onClick={() => {
                        handleColorSelect("red-500");
                        changeColor("red");
                        setIsDrawing(true);
                        drawing(true);
                        toggleStackedButtons();
                        toggleErase(false);
                      }}
                    ></CustomButton>
                    <CustomButton
                      className="p-2 bg-blue-500 text-white hover:bg-blue-600"
                      buttonType="circle"
                      onClick={() => {
                        handleColorSelect("blue-500");
                        changeColor("blue");
                        setIsDrawing(true);
                        drawing(true);
                        toggleStackedButtons();
                        toggleErase(false);
                      }}
                    ></CustomButton>
                    <CustomButton
                      className="p-2 bg-green-500 text-white hover:bg-green-600"
                      buttonType="circle"
                      onClick={() => {
                        handleColorSelect("green-500");
                        changeColor("green");
                        setIsDrawing(true);
                        drawing(true);
                        toggleStackedButtons();
                        toggleErase(false);
                      }}
                    ></CustomButton>
                    <CustomButton
                      className="bg-white text-gray-600 border border-gray-500 hover:text-red-600 hover:border-red-600"
                      buttonType="circle"
                      onClick={() => {
                        setIsDrawing(false);
                        drawing(false);
                        setShowColorChoices(false);
                        toggleStackedButtons();
                      }}
                    >
                      <PencilOff size={14} />
                    </CustomButton>
                  </div>
                )}
              </div>
            </>
          )}
          {/* Toggle button */}
          <CustomButton
            className="bg-gray-900 text-white hover:bg-gray-700"
            buttonType="circle"
            onClick={toggleStackedButtons}
          >
            {showStackedButtons ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronUp size={14} />
            )}
          </CustomButton>

          {/* Main Action Buttons */}
          <div className="flex space-x-2">
            {!isSubmitted && selectedChoice && !autoSubmit && (
              <CustomButton
                text="Submit"
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={handleSubmit}
              />
            )}
            {isSubmitted ? (
              <CustomButton
                text="Next"
                className="bg-gray-900 text-white hover:bg-gray-700"
                onClick={handleNext}
              />
            ) : (
              !isLast && (
                <CustomButton
                  text="Skip"
                  className="bg-gray-900 text-white hover:bg-gray-700"
                  onClick={handleSkip}
                />
              )
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto w-full bg-white shadow-lg py-4 border-t relative">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex justify-center items-center space-x-2">
            {choices.map((choice) => {
              const isCorrect = choice === correctAnswer.toUpperCase().trim();
              const isSelected = choice === selectedChoice;

              let bgColor = "bg-gray-400 sm:hover:bg-gray-600 text-white";
              if (isSelected && isSubmitted) {
                bgColor = isCorrect
                  ? "bg-green-500 text-white animate-pulse"
                  : "bg-red-500";
              }
              if (!isSelected && selectedChoice && isCorrect && isSubmitted) {
                bgColor = "bg-green-500 animate-bounce text-white";
              }

              return (
                <button
                  key={choice}
                  className={`flex items-center justify-center w-10 h-10 rounded-md
                      text-xs sm:text-sm font-semibold transition duration-300 ease-in-out ${bgColor} 
                      ${
                        isSelected && !isSubmitted
                          ? "border-4 border-gray-500 bg-gray-700"
                          : ""
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
