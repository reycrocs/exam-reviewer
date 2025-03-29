import React from "react";
import CustomButton from "./CustomButton";

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
            <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold">
                    {modalType === "submit" ? "Submit Exam" : "Exit Exam"}
                </h2>
                <p className="mt-2">Are you sure you want to {modalType}?</p>
                <div className="mt-4 flex justify-end space-x-4">
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