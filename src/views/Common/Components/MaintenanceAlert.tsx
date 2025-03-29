import React from "react";
import { AlertTriangle } from "lucide-react";

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
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MaintenanceAlert;