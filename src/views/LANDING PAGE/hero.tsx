import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Settings, Database, Cpu, Code2, Network, Layers, ShieldCheck, Repeat, Check } from "lucide-react";
import CustomButton from "../Common/Components/CustomButton";
import { examOptions } from "../../helpers/exams";

import { useDispatch } from "react-redux";
import { resetCounts, setTotalQuestion } from "../../store/flashcardSlice";
import { encryptData } from "../../utils/encrypt";

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

export default function Hero() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const marqueeRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [continueModal, setContinueModal] = useState(false);
    const [selectedExams, setSelectedExams] = useState<string[]>([]);

    useEffect(() => {
        if (showModal || showAlert) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    
        return () => {
            document.body.style.overflow = "";
        };
    }, [showModal, showAlert]);

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
        navigate("/flashcards");
    };

    const handleProceed = () => {
        localStorage.removeItem("shuffledQuestionData");
        dispatch(resetCounts());
    
        const selectedQuestions = selectedExams.flatMap((exam) => examOptions[exam].items);
        const jsonString = JSON.stringify(selectedQuestions);
        const encryptedData = encryptData(jsonString);
        localStorage.setItem("selectedQuestions", encryptedData);
        dispatch(setTotalQuestion(selectedQuestions.length));
        setShowModal(false);
        navigate("/flashcards");
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
                    <CustomButton text="Start Demo" onClick={() => setShowAlert(true)} />
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

            {/* Modal */}
            {showAlert && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center">
                        <h2 className="text-xl font-black text-white">Under Maintenance</h2>
                        <p className="mt-3 text-gray-300">Sorry, this feature is currently under maintenance. Please check back later.</p>
                        <button 
                            onClick={() => setShowAlert(false)} 
                            className="mt-4 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                    <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-[550px] max-h-[500px] flex flex-col text-white">
                        {/* Header */}
                        <div className="flex items-center justify-between w-full">
                            <h2 className="text-xl font-black text-white">Select Exams</h2>

                            {/* Select All / Deselect All Button */}
                            <button
                                onClick={() => {
                                    if (selectedExams.length === Object.keys(examOptions).length) {
                                        setSelectedExams([]); // Deselect all
                                    } else {
                                        setSelectedExams(Object.keys(examOptions)); // Select all
                                    }
                                }}
                                className="text-sm font-semibold text-green-400 hover:text-green-300 transition"
                            >
                                {selectedExams.length === Object.keys(examOptions).length ? "Deselect All" : "Select All"}
                            </button>
                        </div>

                        {/* Scrollable Exam List */}
                        <div className="mt-4 overflow-y-auto max-h-[300px] px-2 py-2 border border-gray-700 rounded-lg bg-gray-800">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {Object.entries(examOptions).map(([exam, { itemCount }]) => {
                                    const isSelected = selectedExams.includes(exam);
                                    return (
                                        <div
                                            key={exam}
                                            onClick={() => toggleExam(exam)}
                                            className={`flex items-center text-center sm:text-left sm:flex-row px-4 py-2 rounded-lg cursor-pointer transition border ${
                                                isSelected ? "bg-green-600 border-green-500 text-white" : "bg-gray-700 border-gray-600 text-gray-300"
                                            }`}
                                        >
                                            {/* Fixed space for the check icon */}
                                            <div className="w-5 flex justify-center mr-2">
                                                {isSelected && <Check className="text-white" size={18} />}
                                            </div>

                                            <span className="capitalize text-sm font-medium">{exam.replace(/_/g, ' ')} - {itemCount} Items</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Total Selected Items & Buttons */}
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm font-semibold text-gray-300">
                            {/* Total count on top for mobile */}
                            <span className="mb-3 sm:mb-0">
                                Total Items: {selectedExams.reduce((total, exam) => total + (examOptions[exam]?.itemCount || 0), 0)} Items
                            </span>

                            {/* Buttons - Always aligned to bottom right on mobile */}
                            <div className="flex justify-end sm:justify-start space-x-3">
                                <CustomButton
                                    text="Cancel"
                                    className="bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
                                    onClick={() => setShowModal(false)}
                                />
                                <CustomButton
                                    text="Start"
                                    className={`bg-green-600 hover:bg-green-700 text-white transition rounded-lg px-4 py-2 font-semibold shadow-sm ${
                                        selectedExams.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                    onClick={handleProceed}
                                    disabled={selectedExams.length === 0}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
