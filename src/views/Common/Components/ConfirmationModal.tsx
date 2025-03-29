import React from "react";
import CustomButton from "./CustomButton";
import { AlertTriangle, FileCheck } from "lucide-react";

type ConfirmationModalProps = {
    modalType: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ modalType, isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50 p-4">
            <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg">
                <div className="flex flex-col items-center text-center">
                    {modalType === "submit" ? (
                        <FileCheck className="w-10 h-10 text-green-500 mb-2" />
                    ) : (
                        <AlertTriangle className="w-10 h-10 text-red-500 mb-2" />
                    )}
                    <h2 className="text-lg font-semibold">
                        {modalType === "submit" ? "Submit Exam" : "Exit Exam"}
                    </h2>
                    <p className="mt-2">Are you sure you want to {modalType}?</p>
                </div>
                <div className="mt-4 flex items-center justify-center space-x-4">
                    <CustomButton
                        text="Cancel"
                        className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                        onClick={onClose}
                    />
                    <CustomButton
                        text={modalType === "submit" ? "Yes, Submit" : "Yes, Exit"}
                        className={`${
                        modalType === "submit"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-700"
                        } text-white`}
                        onClick={onConfirm}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;