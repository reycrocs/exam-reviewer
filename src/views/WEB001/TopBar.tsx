import { useState, useEffect } from "react";
import CustomButton from "../Common/Components/CustomButton";
import { Timer } from "lucide-react";

interface TimerNavbarProps {
  onSubmit: () => void;
  onExit: () => void;
}

export const TopBar: React.FC<TimerNavbarProps> = ({ onSubmit, onExit }) => {
  const [time, setTime] = useState(7200); // 2 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <nav className="p-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-gray-900 text-white drop-shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo (Hidden in Mobile View) */}
        <img 
          src="/prepit-dark.png" 
          alt="PREP-IT Logo" 
          className="h-8 md:block hidden" 
        />
        
        {/* Timer and Buttons */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center text-md font-semibold md:ml-auto mr-4">
            <Timer className="mr-2" />
            {formatTime(time)}
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            <CustomButton
              text="Submit"
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={onSubmit}
            />
            <CustomButton
              text="Exit Demo"
              className="bg-gray-700 text-white hover:bg-gray-600"
              onClick={onExit}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}