import { useEffect, useRef } from "react";
import { BookOpen, Settings, Database, Cpu, Code2, Network, Layers, ShieldCheck, Repeat} from "lucide-react";
import CustomButton from "../Common/Components/CustomButton";

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
    const marqueeRef = useRef<HTMLDivElement>(null);

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
        <section className="flex flex-col items-center min-h-[calc(100vh-68px)] px-6 pt-10 sm:pt-32">
            {/* Hero Section */}
            <div className="w-full max-w-4xl text-center space-y-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-gray-900 leading-tight font-black font-lemon">
                    What’s your exam strategy?
                </h1>
                <p className="text-md sm:text-lg lg:text-xl text-gray-600 leading-relaxed px-2 sm:px-0">
                    <span className="font-black text-gray-900">PREP<span className="text-green-600">IT</span></span> gives you the power to prepare your way—with smart flashcards, real exam simulations, and review tools built to help you pass your IT exams faster and with confidence.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <CustomButton text="Start Demo" onClick={() => console.log("Start Demo clicked")} />
                    <span className="text-gray-500 text-sm sm:text-base">or</span>
                    <CustomButton text="Try Flashcards" pill="New" onClick={() => console.log("Try Flashcards clicked")} />
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
        </section>
    );
}
