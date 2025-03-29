import { AlertCircle, LoaderCircle } from "lucide-react";
import CustomButton from "../Common/Components/CustomButton";
import { useNavigate } from "react-router-dom";
import { TopBarWEB002 } from "./TopBarWEB002";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { incrementSkipped, resetCounts, setCurrentQuestionIndex, setLoading } from "../../store/flashcardSlice";
import { useEffect, useState } from "react";
import ChoicesPanel from "./ChoicesPanel";
import ExitOverlay from "./Exit";
import { decryptData, encryptData } from "../../utils/encrypt";

const shuffleArray = <T,>(array: T[]): T[] => {
    return array
        .map(item => ({ item, sort: Math.random() }))
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

    const currentQuestionIndex = useSelector((state: RootState) => state.flashcard.currentQuestionIndex);
    const skippedQuestions = useSelector((state: RootState) => state.flashcard.skippedQuestions);
    const correctCount = useSelector((state: RootState) => state.flashcard.correctCount);
    const wrongCount = useSelector((state: RootState) => state.flashcard.wrongCount);
    const totalQuestions = useSelector((state: RootState) => state.flashcard.totalQuestions);
    const ended = useSelector((state: RootState) => state.flashcard.ended);
    const isLoading = useSelector((state: RootState) => state.flashcard.isLoading);

    const totalAnswered = correctCount + wrongCount;

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden"; // Disable background scrolling
        } else {
            document.body.style.overflow = ""; // Re-enable scrolling when modal closes
        }
    
        return () => {
            document.body.style.overflow = ""; // Cleanup on unmount
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
            if (!decryptedString) throw new Error("Decryption failed or returned null.");
    
            const parsedData = JSON.parse(decryptedString); // Parse decrypted JSON
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
        if (isSkipped) dispatch(incrementSkipped());
        dispatch(setCurrentQuestionIndex());
    };

    return (
        <>
            {ended && <ExitOverlay />}
            <TopBarWEB002 onExit={() => handleOpenModal("exit")} />

            <div className="container mx-auto max-w-4xl px-4 pt-5 sm:pt-10 flex flex-col items-center mb-32">
                {isLoading && (
                    <div className="flex flex-col gap-10 text-center justify-center items-center mt-[20vh]">
                        <LoaderCircle className="w-16 h-16 text-green-600 animate-spin" />
                        <p className="animate-pulse">
                            Loading questions, please wait... <br />
                            If this takes too long, try refreshing the page.
                        </p>
                    </div>
                )}

                {!isLoading && error && (
                    <div className="flex flex-col gap-6 text-center justify-center items-center mt-[20vh]">
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

                <img
                    className={`mx-auto w-full ${isLoading || error ? "opacity-0" : "opacity-100"}`}
                    //src={`/q/qdata/${questionData.img}`}
                    src={`/q/${q[1]}/${q[2]}/${q[0]}/${questionData.img}`}
                    alt="question"
                    onLoad={() => dispatch(setLoading(false))}
                    onError={() => setError(true)}
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-semibold">
                            {modalType === "submit" ? "Submit Exam" : "Exit Exam"}
                        </h2>
                        <p className="mt-2">Are you sure you want to {modalType}?</p>
                        <div className="mt-4 flex justify-end space-x-4">
                            <CustomButton
                                text="Cancel"
                                className="bg-gray-700 text-white hover:bg-gray-600"
                                onClick={() => setIsModalOpen(false)}
                            />
                            <CustomButton
                                text={modalType === "submit" ? "Yes, Submit" : "Yes, Exit"}
                                className={`${
                                    modalType === "submit"
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-red-700 hover:bg-red-900"
                                } text-white`}
                                onClick={handleConfirm}
                            />
                        </div>
                    </div>
                </div>
            )}

            {!isLoading && !ended && (
                <ChoicesPanel
                    onNext={() => handleNextQuestion(false)}
                    onSkip={() => handleNextQuestion(true)}
                    correctAnswer={questionData.answer}
                    choicesLength={questionData.choicesLength ?? 4} // Default to 4 if undefined
                    totalAnsweredQuestion={totalAnswered}
                    totalQuestions={totalQuestions}
                />
            )}
        </>
    );
}