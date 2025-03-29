import React from "react";
import { AlertTriangle } from "lucide-react";
import CustomButton from "./CustomButton";

type MaintenanceAlertProps = {
  onClose: () => void;
};

const MaintenanceAlert: React.FC<MaintenanceAlertProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50 p-4">
      <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-xl max-w-sm w-full text-center border border-gray-300">
        <AlertTriangle className="w-10 h-10 mx-auto text-yellow-500" />
        <h2 className="text-xl font-black text-gray-900 mt-2">Under Maintenance</h2>
        <p className="mt-3 text-gray-700">
          Sorry, this feature is currently under maintenance. Please check back later.
        </p>
        <CustomButton
            text="Close"
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 mt-4"
            onClick={onClose}
        />
      </div>
    </div>
  );
};

export default MaintenanceAlert;