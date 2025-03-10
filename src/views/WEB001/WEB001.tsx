import Instructions from "../Common/Components/Instructions";
import { Timer } from "../Common/Components/Timer";

export default function WEB001() {
    const handleSubmit = () => {
        alert("Exam submitted!");
    };

    const handleExit = () => {
        alert("Exiting exam...");
    };

    return (
        <div className="">
            <Timer onSubmit={handleSubmit} onExit={handleExit}/>
            <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
                <Instructions instruction="You have 2 hours to complete the exam. Once you submit, your score and the time taken will be displayed." />
            </div>
        </div>
    );
}