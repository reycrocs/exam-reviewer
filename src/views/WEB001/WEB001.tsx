import CustomButton from "../Common/Components/CustomButton";
import Instructions from "../Common/Components/Instructions";
import { useNavigate } from "react-router-dom";
import { TopBar } from "./TopBarWEB001";
import { useEffect, useState } from "react";

export default function WEB001() {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");

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
            <TopBar onSubmit={() => handleOpenModal("submit")} onExit={() => handleOpenModal("exit")} />
            <div className="container mx-auto max-w-4xl min-h-screen px-4 py-8 mt-6 sm:mt-12 md:py-12 pt-[10vh] sm:pt-[20vh]">
                <Instructions instruction="You have 2 hours to complete the exam. Once you submit, your score and the time taken will be displayed." />
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
        </>
    );
}