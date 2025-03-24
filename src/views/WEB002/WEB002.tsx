import { AlertCircle, LoaderCircle } from "lucide-react";
import CustomButton from "../Common/Components/CustomButton";
import { useNavigate } from "react-router-dom";
import { TopBarWEB002 } from "./TopBarWEB002";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { incrementSkipped, resetCounts, setCurrentQuestionIndex, setLoading, toggleEnded, toggleTryAgain } from "../../store/flashcardSlice";
import { useEffect, useState } from "react";
import ChoicesPanel from "./ChoicesPanel";
import confetti from "canvas-confetti";
import ExitOverlay from "./Exit";
import { decryptData, encryptData } from "../../utils/encrypt";

const shuffleArray = <T,>(array: T[]): T[] => {
    let shuffledArray = [...array]; // Create a copy to avoid mutating original data
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const getOrCreateQuestionData = (data: any) => {
    const encryptedData = localStorage.getItem("shuffledQuestionData");

    if (encryptedData) {
        try {
            const decrypted = decryptData(encryptedData);
            return decrypted;
        } catch (e) {
            console.error('Decryption failed, clearing invalid data:', e);
            localStorage.removeItem("shuffledQuestionData");
            return null;
        }
    } else {
        const shuffled = shuffleArray(data);
        const encrypted = encryptData(shuffled);
        localStorage.setItem("shuffledQuestionData", encrypted);
        return shuffled;
    }
};

export default function WEB002() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    
    const currentQuestionIndex = useSelector((state: RootState) => state.flashcard.currentQuestionIndex);
    const skippedQuestions = useSelector((state: RootState) => state.flashcard.skippedQuestions);
    const correctCount = useSelector((state: RootState) => state.flashcard.correctCount);
    const wrongCount = useSelector((state: RootState) => state.flashcard.wrongCount);
    const totalQuestions = useSelector((state: RootState) => state.flashcard.totalQuestions);
    const ended = useSelector((state: RootState) => state.flashcard.ended);
    const isLoading = useSelector((state: RootState) => state.flashcard.isLoading);
    const [error, setError] = useState(false);
    
    const totalAnswered = correctCount + wrongCount;
    const allQuestionsAnswered = totalAnswered === totalQuestions;

    useEffect(() => {
        if (allQuestionsAnswered) {
            triggerFireworks();
        }
    }, [allQuestionsAnswered]);

    const triggerFireworks = () => {
        dispatch(toggleEnded());
        
        const duration = 7 * 1000;
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
        
            const particleCount = 50 * (timeLeft / duration);
        
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
            dispatch(toggleTryAgain());
        }, duration);
    };

    const data = localStorage.getItem("selectedQuestions");

    if (data === null) {
        alert("please select questions first");
        navigate('/');
        return null;
    }

    const parsedData = JSON.parse(data);
    const shuffledData = getOrCreateQuestionData(parsedData);

    const questionData = {
        ...shuffledData[currentQuestionIndex],
        isSkipped: skippedQuestions.includes(currentQuestionIndex),
        isAnswered: correctCount + wrongCount > 0,  
    };

    const handleOpenModal = (type: string) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
        if (modalType === "submit") {
            alert("Exam submitted!");
        } else if (modalType === "exit") {
            dispatch(resetCounts());
            navigate("/");
        }
    };

    const handleNextQuestion = (isSkipped: boolean = false) => {
        if (isSkipped) {
            dispatch(incrementSkipped());
        }
        dispatch(setCurrentQuestionIndex());
    };

    return (
        <>
            {ended && (
                <ExitOverlay />
            )}
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
                    src={`/q/qdata/${questionData.img}`}
                    alt="question"
                    onLoad={() => dispatch(setLoading(false))}
                    onError={() => setError(true)}
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-semibold">{modalType === "submit" ? "Submit Exam" : "Exit Exam"}</h2>
                        <p className="mt-2">Are you sure you want to {modalType}?</p>
                        <div className="mt-4 flex justify-end space-x-4">
                            <CustomButton text="Cancel" className="bg-gray-700 text-white hover:bg-gray-600" onClick={() => setIsModalOpen(false)} />
                            <CustomButton text={modalType === "submit" ? "Yes, Submit" : "Yes, Exit"} className={`${modalType === "submit" ? "bg-green-600 hover:bg-green-700" : "bg-red-700 hover:bg-red-900"} text-white`} onClick={handleConfirm} />
                        </div>
                    </div>
                </div>
            )}

            {!isLoading && !ended && (
                <ChoicesPanel
                    onNext={() => handleNextQuestion(false)}
                    onSkip={() => handleNextQuestion(true)}
                    correctAnswer={questionData.answer}
                    choicesLength={questionData.choicesLength ?? 4}  // Default to 4 if undefined
                    totalAnsweredQuestion={totalAnswered}
                    totalQuestions={totalQuestions}
                />              
            )}
        </>
    );
}
