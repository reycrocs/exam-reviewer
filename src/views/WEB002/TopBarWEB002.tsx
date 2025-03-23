import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { toggleAutoSubmit } from "../../store/flashcardSlice";
import { Settings } from "lucide-react"; // Import cog icon
import CustomButton from "../Common/Components/CustomButton";

interface TopBarProps {
  onExit: () => void;
}

export const TopBarWEB002: React.FC<TopBarProps> = ({ onExit }) => {
  const dispatch = useDispatch();
  const autoSubmit = useSelector((state: RootState) => state.flashcard.enabled);
  const correctCount = useSelector((state: RootState) => state.flashcard.correctCount);
  const wrongCount = useSelector((state: RootState) => state.flashcard.wrongCount);
  const skippedCount = useSelector((state: RootState) => state.flashcard.skippedCount);
  
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="p-4 top-0 left-0 w-full z-50 transition-all duration-300 bg-gray-900 text-white drop-shadow-sm">
      <div className="container mx-auto flex items-center relative">
        {/* Logo - Hidden on mobile */}
        <img 
          src="/prepit-dark.png" 
          alt="PREP-IT Logo" 
          className="h-8 hidden md:block"
        />

        {/* Scoreboard */}
        <div className="flex items-center space-x-4 text-sm sm:text-md font-regular 
          md:absolute md:left-1/2 md:transform md:-translate-x-1/2 
          md:justify-center justify-start w-full md:w-auto">
          <div>Correct: {correctCount}</div>
          <div>Wrong: {wrongCount}</div>
          <div>Skipped: {skippedCount}</div>
        </div>

        {/* Desktop View - Auto Submit Toggle & Exit Button */}
        <div className="ml-auto hidden md:flex items-center space-x-4">
          {/* Auto Submit Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Auto Submit</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoSubmit}
                onChange={() => dispatch(toggleAutoSubmit())}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 
                rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-5 peer-checked:after:border-white 
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600">
              </div>
            </label>
          </div>

          {/* Exit Button */}
          <CustomButton
            text="Exit"
            className="bg-gray-700 text-white hover:bg-gray-600"
            onClick={onExit}
          />
        </div>

        {/* Mobile View - Cog Icon */}
        <div className="ml-auto md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Settings size={28} />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg p-4 flex flex-col space-y-3">
            {/* Auto Submit Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Auto Submit</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSubmit}
                  onChange={() => dispatch(toggleAutoSubmit())}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 
                  rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-5 peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                  after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500">
                </div>
              </label>
            </div>

            {/* Exit Button */}
            <CustomButton
              text="Exit"
              className="bg-gray-700 text-white hover:bg-gray-600 w-full"
              onClick={onExit}
            />
          </div>
        )}
      </div>
    </nav>
  );
};