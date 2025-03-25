import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Settings, Database, Cpu, Code2, Network, Layers, ShieldCheck, Repeat } from "lucide-react";
import CustomButton from "../Common/Components/CustomButton";
//import { exam2024S_FE_AM, exam2024A_FE_AM, exam2023S_FE_AM } from "../../exams/exam";
//import { encrypted2023S_FE_AM, encrypted2024A_FE_AM, encrypted2024S_FE_AM } from "../../exams/encryptedExam";
import { exam2023S_FE_AM } from "../../encryptedExams/2023S_FE_AM";
import { exam2024A_FE_AM } from "../../encryptedExams/2024A_FE_AM";
import { exam2024S_FE_AM } from "../../encryptedExams/2024S_FE_AM";
import { useDispatch } from "react-redux";
import { resetCounts, setTotalQuestion } from "../../store/flashcardSlice";
import { encryptData, decryptData } from "../../utils/encrypt";

const topics = [
    { title: "Problem Solving & Logical Thinking", icon: <Settings size={40} className="text-green-600" /> },
    { title: "Information Security Essentials", icon: <ShieldCheck size={40} className="text-green-600" /> },
    { title: "Project Management Fundamentals", icon: <Layers size={40} className="text-green-600" /> },
    { title: "System Development Life Cycle (SDLC)", icon: <Repeat size={40} className="text-green-600" /> },
    { title: "Algorithms", icon: <Code2 size={40} className="text-green-600" /> },
    { title: "Data Structures", icon: <Database size={40} className="text-green-600" /> },
    { title: "Operating Systems", icon: <Cpu size={40} className="text-green-600" /> },
    { title: "Networking & Communication Protocols", icon: <Network size={40} className="text-green-600" /> },
    { title: "Database Design & SQL Fundamentals", icon: <BookOpen size={40} className="text-green-600" /> },
    { title: "Software Development", icon: <Code2 size={40} className="text-green-600" /> },
];

// const examOptions: Record<string, any[]> = {
//     "2024S_FE_AM": exam2024S_FE_AM,
//     "2024A_FE_AM": exam2024A_FE_AM,
//     "2023S_FE_AM": exam2023S_FE_AM,
// };

const examOptions: Record<string, any[]> = {
    "2024S_FE_AM": JSON.parse(decryptData(exam2024S_FE_AM)),
    "2024A_FE_AM": JSON.parse(decryptData(exam2024A_FE_AM)),
    "2023S_FE_AM": JSON.parse(decryptData(exam2023S_FE_AM)),
};

export default function Hero() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const marqueeRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState(false);
    const [continueModal, setContinueModal] = useState(false);
    const [selectedExams, setSelectedExams] = useState<string[]>([]);

    const toggleExam = (exam: string) => {
        setSelectedExams(prev =>
            prev.includes(exam)
                ? prev.filter(e => e !== exam)
                : [...prev, exam]
        );
    };

    const handleFlashcard = () => {
        const shuffledData = localStorage.getItem("shuffledQuestionData");
    
        if (shuffledData) {
            setContinueModal(true);
        } else {
            setShowModal(true);
        }
    };

    const handleContinue = () => {
        setContinueModal(false);
        navigate("/web002");
    };

    const handleProceed = () => {
        localStorage.removeItem("shuffledQuestionData");
        dispatch(resetCounts());
    
        const selectedQuestions = selectedExams.flatMap((exam) => examOptions[exam]);
        const jsonString = JSON.stringify(selectedQuestions); // Convert to JSON string before encrypting
        const encryptedData = encryptData(jsonString);
        //console.log(encryptedData);
        localStorage.setItem("selectedQuestions", encryptedData);
        dispatch(setTotalQuestion(selectedQuestions.length));
        setShowModal(false);
        navigate("/web002");
    };
    

    useEffect(() => {
        const marquee = marqueeRef.current;
        let animation: number;

        const startMarquee = () => {
            if (!marquee) return;
            const scrollWidth = marquee.scrollWidth / 2;
            let currentX = 0;

            const animate = () => {
                currentX -= 1;
                if (Math.abs(currentX) >= scrollWidth) {
                    currentX = 0;
                }
                marquee.style.transform = `translateX(${currentX}px)`;
                animation = requestAnimationFrame(animate);
            };
            animation = requestAnimationFrame(animate);
        };

        startMarquee();
        return () => cancelAnimationFrame(animation);
    }, []);

    return (
        <section className="flex flex-col items-center min-h-screen justify-center px-6 py-24 sm:py-32 relative">
            {/* Hero Section */}
            <div className="w-full max-w-4xl text-center space-y-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-gray-900 leading-tight font-black font-lemon">
                    What’s your exam strategy?
                </h1>
                <p className="text-md sm:text-lg lg:text-xl text-gray-600 leading-relaxed px-2 sm:px-0">
                    <span className="font-black text-gray-900">PREP<span className="text-green-600">IT</span></span> gives you the power to prepare your way—with smart flashcards, real exam simulations, and review tools built to help you pass your IT exams faster and with confidence.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <CustomButton text="Start Demo" onClick={() => navigate("/web001")} />
                    <span className="text-gray-500 text-sm sm:text-base">or</span>
                    <CustomButton text="Try Flashcards" pill="New" onClick={handleFlashcard} />
                </div>
            </div>

            {/* Section Title */}
            <div className="mt-10 sm:mt-24 w-full text-center">
                <h2 className="text-md sm:text-xl font-bold text-gray-800 uppercase tracking-wide mb-4">
                    Topics you will encounter and learn:
                </h2>
            </div>

            {/* Marquee Carousel */}
            <div className="w-full max-w-6xl overflow-hidden relative">
                <div ref={marqueeRef} className="flex gap-4 w-max will-change-transform">
                    {[...topics, ...topics].map((topic, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center justify-center border rounded-xl p-6 w-[200px] min-h-[200px] shrink-0 bg-gray-50 shadow"
                        >
                            {topic.icon}
                            <h3 className="text-sm text-center font-semibold text-gray-800 mt-4">
                                {topic.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>

            {continueModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-80">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-lg font-semibold">Continue Flashcards</h2>
                            <p className="mt-2">You have unfinished flashcards. Do you wish to continue?</p>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <CustomButton
                                text="Create New"
                                className="bg-gray-700 text-white hover:bg-gray-600"
                                onClick={() => {
                                    setContinueModal(false);
                                    setShowModal(true);
                                }}
                            />
                            <CustomButton
                                text="Continue"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={handleContinue}
                            />
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-80">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-lg font-semibold">Select Exams</h2>
                            <div className="mt-4 space-y-2">
                                {Object.keys(examOptions).map((exam) => (
                                    <label key={exam} className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedExams.includes(exam)}
                                            onChange={() => toggleExam(exam)}
                                            className="form-checkbox text-green-500 accent-green-500"
                                        />
                                        <span className="capitalize text-sm">{exam.replace(/_/g, ' ')}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <CustomButton
                                text="Cancel"
                                className="bg-gray-700 text-white hover:bg-gray-600"
                                onClick={() => setShowModal(false)}
                            />
                            <CustomButton
                                text="Start"
                                className={`bg-green-600 hover:bg-green-700 text-white ${
                                    selectedExams.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                onClick={handleProceed}
                                disabled={selectedExams.length === 0}
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
