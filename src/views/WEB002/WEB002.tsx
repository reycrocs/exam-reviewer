import { AlertCircle, LoaderCircle } from "lucide-react";
import CustomButton from "../Common/Components/CustomButton";
import { useNavigate } from "react-router-dom";
import { TopBarWEB002 } from "./TopBarWEB002";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementSkipped,
  resetCounts,
  setCurrentQuestionIndex,
  setLoading,
} from "../../store/flashcardSlice";
import { useEffect, useRef, useState } from "react";
import ChoicesPanel from "./ChoicesPanel";
import ExitOverlay from "./Exit";
import { decryptData, encryptData } from "../../utils/encrypt";
import ConfirmationModal from "../Common/Components/ConfirmationModal";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

const shuffleArray = <T,>(array: T[]): T[] => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const getOrCreateQuestionData = (data: any) => {
  try {
    const encryptedData = localStorage.getItem("shuffledQuestionData");
    if (encryptedData) return decryptData(encryptedData);

    const shuffled = shuffleArray(data);
    localStorage.setItem("shuffledQuestionData", encryptData(shuffled));
    return shuffled;
  } catch (error) {
    console.error("Error processing question data:", error);
    localStorage.removeItem("shuffledQuestionData");
    return [];
  }
};

export default function WEB002() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [error, setError] = useState(false);
  const [shuffledData, setShuffledData] = useState<any[]>([]);

  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [color, setColor] = useState<string>("black");
  const [isErasing, setIsErasing] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleUndo = () => canvasRef.current?.undo();
  const handleClear = () => canvasRef.current?.clearCanvas();

  const handleColorChange = (color: string) => {
    setColor(color);
    setIsErasing(false);
  };

  const toggleEraser = (state: boolean) => {
    setIsErasing(state);
    canvasRef.current?.eraseMode(state);
  };

  const currentQuestionIndex = useSelector(
    (state: RootState) => state.flashcard.currentQuestionIndex
  );
  const skippedQuestions = useSelector(
    (state: RootState) => state.flashcard.skippedQuestions
  );
  const correctCount = useSelector(
    (state: RootState) => state.flashcard.correctCount
  );
  const wrongCount = useSelector(
    (state: RootState) => state.flashcard.wrongCount
  );
  const totalQuestions = useSelector(
    (state: RootState) => state.flashcard.totalQuestions
  );
  const ended = useSelector((state: RootState) => state.flashcard.ended);

  useEffect(() => {
    if (ended) {
      canvasRef.current?.clearCanvas();
    }
  }, [ended]);

  const isLoading = useSelector(
    (state: RootState) => state.flashcard.isLoading
  );

  const totalAnswered = correctCount + wrongCount;

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const encryptedData = localStorage.getItem("selectedQuestions");

    if (!encryptedData) {
      navigate("/");
      return;
    }

    try {
      const decryptedString = decryptData(encryptedData);
      if (!decryptedString)
        throw new Error("Decryption failed or returned null.");

      const parsedData = JSON.parse(decryptedString);
      setShuffledData(getOrCreateQuestionData(parsedData));
    } catch (error) {
      console.error("Invalid JSON data:", error);
      localStorage.removeItem("selectedQuestions");
      navigate("/");
    }
  }, []);

  if (!shuffledData.length) return null; // Prevent rendering until data is ready

  const questionData = {
    ...shuffledData[currentQuestionIndex],
    isSkipped: skippedQuestions.includes(currentQuestionIndex),
    isAnswered: totalAnswered > 0,
  };

  const q = questionData.img.split(/_/);

  const handleOpenModal = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    if (modalType === "submit") {
      alert("Exam submitted!");
    } else if (modalType === "exit") {
      navigate("/");
      localStorage.removeItem("selectedQuestions");
      dispatch(resetCounts());
    }
  };

  const handleNextQuestion = (isSkipped: boolean = false) => {
    // Scroll smoothly to a specific section by ID
    const targetElement = document.getElementById("header");
    targetElement?.scrollIntoView({ behavior: "smooth" });
    if (isSkipped) dispatch(incrementSkipped());
    dispatch(setCurrentQuestionIndex());
  };

  return (
    <>
      {ended && <ExitOverlay onExit={() => handleOpenModal("exit")} />}
      <TopBarWEB002
        onExit={() => handleOpenModal("exit")}
        setShowDropdown={setShowDropdown}
      />

      <div
        className={`relative sm:w-full ${
          ended || (!drawing && !isErasing) ? "pointer-events-none" : ""
        } px-4 pt-5 sm:pt-10 flex flex-col items-center pb-52 min-h-[calc(100vh-70px)] ${
          showDropdown && "hidden"
        }`}
      >
        {/* ✍️ Canvas overlay */}
        <ReactSketchCanvas
          ref={canvasRef}
          className={`top-0 left-0 !border-none w-full h-full z-10 ${
            drawing ? "cursor-crosshair" : ""
          } ${isErasing ? "cursor-cell" : ""} ${
            !showDropdown ? "absolute" : "hidden"
          }`}
          strokeWidth={3}
          eraserWidth={20}
          strokeColor={color}
          canvasColor="transparent"
        />

        {/* ⏳ Loading */}
        {isLoading && (
          <div className="flex flex-col gap-10 text-center justify-center items-center mt-[20vh] z-20 relative">
            <LoaderCircle className="w-16 h-16 text-green-600 animate-spin" />
            <p className="animate-pulse">
              Loading questions, please wait... <br />
              If this takes too long, try refreshing the page.
            </p>
          </div>
        )}

        {/* ❌ Error */}
        {!isLoading && error && (
          <div className="flex flex-col gap-6 text-center justify-center items-center mt-[20vh] z-20 relative">
            <AlertCircle className="w-14 h-14 text-gray-400" />
            <p className="text-gray-600 leading-relaxed">
              Connection is slow or the image failed to load. <br />
              Please try refreshing the page.
            </p>
            <CustomButton
              text="Refresh Page"
              onClick={() => window.location.reload()}
              className="bg-green-600 text-white hover:bg-green-700"
            />
          </div>
        )}

        {/* 🖼️ Question Image */}
        <img
          className={`mx-auto w-full sm:max-w-4xl ${
            isLoading || error ? "opacity-0" : "opacity-100"
          } z-0 select-none`}
          src={`/q/${q[1]}/${q[2]}/${q[0]}/${questionData.img}`}
          alt="question"
          onLoad={() => dispatch(setLoading(false))}
          onError={() => setError(true)}
        />
      </div>

      {showDropdown && (
        <img
          className={`px-4 pt-5 sm:pt-10 pb-52 mx-auto w-full sm:max-w-4xl ${
            isLoading || error ? "opacity-0" : "opacity-100"
          } z-0 select-none`}
          src={`/q/${q[1]}/${q[2]}/${q[0]}/${questionData.img}`}
          alt="question"
          onLoad={() => dispatch(setLoading(false))}
          onError={() => setError(true)}
        />
      )}

      {isModalOpen && (
        <ConfirmationModal
          modalType={modalType}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
        />
      )}

      {!isLoading && !ended && (
        <ChoicesPanel
          onNext={() => handleNextQuestion(false)}
          onSkip={() => handleNextQuestion(true)}
          correctAnswer={questionData.answer}
          choicesLength={questionData.choicesLength ?? 4}
          totalAnsweredQuestion={totalAnswered}
          totalQuestions={totalQuestions}
          // for canvas
          changeColor={handleColorChange}
          toggleErase={toggleEraser}
          handleClear={handleClear}
          handleUndo={handleUndo}
          drawing={setDrawing}
        />
      )}
    </>
  );
}
