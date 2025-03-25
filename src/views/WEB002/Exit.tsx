import { useSelector, useDispatch } from "react-redux";
import { resetFlashcards, toggleEnded } from "../../store/flashcardSlice";
import { RootState } from "../../store/store";
import CustomButton from "../Common/Components/CustomButton";

const ExitOverlay = () => {
    const dispatch = useDispatch();
    const ended = useSelector((state: RootState) => state.flashcard.ended);
    const showTryAgain = useSelector((state: RootState) => state.flashcard.tryAgain);
    const correct = useSelector((state: RootState) => state.flashcard.correctCount);
    const total = useSelector((state: RootState) => state.flashcard.totalQuestions);

    const tryAgain = () => {
        dispatch(toggleEnded(false));
        dispatch(resetFlashcards());
    };

    // Calculate the percentage score
    const scorePercentage = (correct / total) * 100;

    // Dynamic message based on the score percentage
    let scoreMessage = '';
    if (scorePercentage === 100) {
        scoreMessage = 'Excellent! You nailed every question! 🎯';
    } else if (scorePercentage >= 90) {
        scoreMessage = 'Outstanding! You’re almost there! 🌟';
    } else if (scorePercentage >= 80) {
        scoreMessage = 'Great job! Keep it up! 👍';
    } else if (scorePercentage >= 70) {
        scoreMessage = 'Awesome work! You’re on the right track! 🚀';
    } else if (scorePercentage >= 60) {
        scoreMessage = 'Good work! With a little more practice, you’ll be even better! 💪';
    } else if (scorePercentage >= 50) {
        scoreMessage = 'Not bad! You’re getting better, just keep at it! 🔥';
    } else if (scorePercentage >= 40) {
        scoreMessage = 'You’re getting there! A bit more study will help you improve. 📚';
    } else {
        scoreMessage = 'Keep going! Don’t give up; every mistake is a learning opportunity. 💡';
    }

    if (!ended) return null; // Prevents rendering if hidden

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-md px-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white animate-bounce text-center">
                🎉 Congratulations! 🎉
            </h1>

            {/* Dynamic Score Message */}
            <p className="mt-4 text-center text-white text-sm sm:text-md md:text-lg">{scoreMessage}</p>

            {/* Score Display */}
            <div className="mt-4 mb-6 text-center text-white text-sm sm:text-md md:text-lg space-y-2">
                <p className="mt-2">
                    Total Score: <span className="font-bold">{correct}/{total}</span> ({scorePercentage.toFixed(2)}%)
                </p>
            </div>

            {/* Exit Button */}
            {showTryAgain && (
                <CustomButton text="Try Again" onClick={tryAgain} />
            )}
        </div>
    );
};

export default ExitOverlay;