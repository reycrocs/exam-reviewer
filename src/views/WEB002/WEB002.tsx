import CustomButton from "../Common/Components/CustomButton";
import Instructions from "../Common/Components/Instructions";
import { useNavigate } from "react-router-dom";
import { TopBarWEB002 } from "./TopBarWEB002";
import { useState } from "react";
import ChoicesPanel from "./ChoicesPanel";

export default function WEB002() {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");

    const handleOpenModal = (type:string) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
        if (modalType === "submit") {
            alert("Exam submitted!");
        } else if (modalType === "exit") {
            navigate("/");
        }
    };

    return (
        <>
            <TopBarWEB002 onExit={() => handleOpenModal("exit")} />
            <div className="container mx-auto max-w-4xl min-h-screen px-4 pt-5 sm:pt-10">
                <img className="mx-auto w-full" src="https://it-exam-reviewer.vercel.app/aaea4d7e-8026-482f-9f2e-3ccdb5b72136/b536ff88-a313-4ff7-8983-f20f9203a67e/2024S_IP_14.png" alt="question" />
            </div>
            
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-semibold">{modalType === "submit" ? "Submit Exam" : "Exit Exam"}</h2>
                        <p className="mt-2">Are you sure you want to {modalType}?</p>
                        <div className="mt-4 flex justify-end space-x-4">
                            <CustomButton
                                text="Cancel"
                                className="bg-gray-700 text-white hover:bg-gray-600"
                                onClick={() => setIsModalOpen(false)}
                            />
                            <CustomButton
                                text={modalType === "submit" ? "Yes, Submit" : "Yes, Exit"}
                                className={`${modalType == "submit" ? "bg-green-600 hover:bg-green-700" : "bg-red-700 hover:bg-red-900"} text-white`}
                                onClick={handleConfirm}
                            />
                        </div>
                    </div>
                </div>
            )}
            <ChoicesPanel onSkip={() => alert("skipped")} correctAnswer="b" choicesLength={10} />
        </>
    );
}