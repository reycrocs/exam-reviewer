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
  Circle,
  Eraser,
  Pencil,
  PencilOff,
  RotateCcw,
  Trash2,
  X,
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

  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [showPenTools, setShowPenTools] = useState(false);

  const [showMessage, setShowMessage] = useState(() => {
    // Check if the message has been closed previously
    const messageClosed = localStorage.getItem("messageClosed");
    // If messageClosed is not in localStorage, default to true (show message)
    return messageClosed !== "true"; // This will show the message if it's not closed
  });

  const closeMessage = () => {
    // Set localStorage flag to remember that the user has closed the message
    localStorage.setItem("messageClosed", "true");
    setShowMessage(false);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="fixed bottom-0 w-full flex flex-col z-20">
      <div className="container mx-auto max-w-4xl flex justify-between items-center p-2 relative">
        {showMessage && (
          <>
            {/* Message Box for Mobile */}
            <div className="absolute -top-24 left-2 z-30 2xl:hidden flex flex-col items-start">
              <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm max-w-xs flex justify-between items-start space-x-2 relative select-none">
                <span>
                  Try this new feature, allowing you to highlight text, draw
                  solutions, or sketch directly on the screen. This works
                  perfectly on iPad with a pen!
                </span>
                <button
                  onClick={closeMessage}
                  className="text-white hover:text-gray-400"
                >
                  <X size={16} />
                </button>

                {/* Pointer */}
                <div className="absolute left-3 -bottom-2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-gray-900"></div>
              </div>
            </div>

            {/* Message Box for Desktop */}
            <div className="absolute left-[-330px] bottom-2 z-30 hidden 2xl:flex flex-col items-start">
              <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm max-w-xs flex justify-between items-start space-x-2 relative select-none">
                <span>
                  Try this new feature, allowing you to highlight text, draw
                  solutions, or sketch directly on the screen. This works
                  perfectly on iPad with a pen!
                </span>
                <button
                  onClick={closeMessage}
                  className="text-white hover:text-gray-400"
                >
                  <X size={16} />
                </button>

                {/* Pointer */}
                <div className="absolute -right-2 bottom-2 w-0 h-0 border-t-[8px] border-b-[8px] border-l-[10px] border-t-transparent border-b-transparent border-l-gray-900"></div>
              </div>
            </div>
          </>
        )}

        {/* Left side - Tools */}
        <div className="flex items-center space-x-2">
          {/* Undo Button */}
          <CustomButton
            className="bg-gray-900 text-white hover:bg-gray-700"
            buttonType="circle"
            onClick={() => {
              handleUndo();
              toggleErase(false);
            }}
            tooltip="Undo"
          >
            <RotateCcw size={14} />
          </CustomButton>

          {/* Delete Button */}
          <CustomButton
            className="bg-gray-900 text-white hover:bg-gray-700"
            buttonType="circle"
            onClick={() => {
              handleClear();
              toggleErase(false);
            }}
            tooltip="Delete Drawings"
          >
            <Trash2 size={14} />
          </CustomButton>

          {/* Pen Toggle Button */}
          {!showPenTools && (
            <CustomButton
              className={`text-white hover:bg-gray-700 ${
                !isDrawing ? "bg-gray-900" : `bg-${selectedColor}`
              }`}
              buttonType="circle"
              onClick={() => setShowPenTools((prev) => !prev)}
              tooltip="Show Pen Tools"
            >
              {isDrawing && !isErasing ? (
                <Pencil size={14} />
              ) : !isDrawing && isErasing ? (
                <Eraser size={14} />
              ) : (
                <PencilOff size={14} />
              )}
            </CustomButton>
          )}

          {/* Pen Tools (shown when toggled) */}
          {showPenTools && (
            <div className="flex space-x-2">
              <CustomButton
                className="bg-gray-900 text-white hover:bg-gray-700"
                buttonType="circle"
                onClick={() => {
                  setIsDrawing(false);
                  drawing(false);
                  setShowPenTools(false);
                  toggleErase(false);
                  setIsErasing(false);
                }}
                tooltip="Disable Pen"
              >
                <PencilOff size={14} />
              </CustomButton>
              <CustomButton
                className="bg-gray-900 text-white hover:bg-gray-700"
                buttonType="circle"
                onClick={() => {
                  toggleErase(true);
                  setIsErasing(true);
                  drawing(false);
                  setIsDrawing(false);
                  setShowPenTools(false);
                }}
                tooltip="Toggle Eraser"
              >
                <Eraser size={14} />
              </CustomButton>

              <CustomButton
                className="bg-black text-white hover:bg-gray-800"
                buttonType="circle"
                onClick={() => {
                  handleColorSelect("black");
                  changeColor("black");
                  setIsDrawing(true);
                  drawing(true);
                  toggleErase(false);
                  setIsErasing(false);
                  setShowPenTools(false);
                }}
                tooltip="Black Pen"
              >
                <Circle size={20} />
              </CustomButton>
              <CustomButton
                className="bg-red-500 text-white hover:bg-red-600"
                buttonType="circle"
                onClick={() => {
                  handleColorSelect("red-500");
                  changeColor("red");
                  setIsDrawing(true);
                  drawing(true);
                  toggleErase(false);
                  setIsErasing(false);
                  setShowPenTools(false);
                }}
                tooltip="Red Pen"
              >
                <Circle size={20} />
              </CustomButton>
              <CustomButton
                className="bg-green-500 text-white hover:bg-green-600"
                buttonType="circle"
                onClick={() => {
                  handleColorSelect("green-500");
                  changeColor("green");
                  setIsDrawing(true);
                  drawing(true);
                  toggleErase(false);
                  setIsErasing(false);
                  setShowPenTools(false);
                }}
                tooltip="Green Pen"
              >
                <Circle size={20} />
              </CustomButton>
              <CustomButton
                className="bg-blue-500 text-white hover:bg-blue-600"
                buttonType="circle"
                onClick={() => {
                  handleColorSelect("blue-500");
                  changeColor("blue");
                  setIsDrawing(true);
                  drawing(true);
                  toggleErase(false);
                  setIsErasing(false);
                  setShowPenTools(false);
                }}
                tooltip="Blue Pen"
              >
                <Circle size={20} />
              </CustomButton>
            </div>
          )}
        </div>

        {/* Right side - Question Count and Action Buttons */}
        <div
          className={`flex items-center space-x-4 ${
            showPenTools && "hidden sm:flex"
          }`}
        >
          {/* Question Count */}
          <span
            className={`text-sm text-gray-500 select-none ${
              !isSubmitted && selectedChoice && !autoSubmit && "hidden sm:block"
            }`}
          >
            {totalQuestions - (correctCount + wrongCount)} questions left
          </span>

          {/* Action Buttons */}
          <div className="flex space-x-2 select-none">
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

      <div className="mt-auto w-full bg-white shadow-lg py-4 border-t relative select-none">
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
