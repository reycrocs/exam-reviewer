import React from 'react'

interface TimerNavbarProps {
    onSubmit: () => void;
    onExit: () => void;
}
export const Timer: React.FC<TimerNavbarProps> = ({ onSubmit, onExit }) => {
    return (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
          <div className="container mx-auto max-w-4xl px-4 py-3 flex justify-between items-center">
            {/* Timer Section */}
            <div className="text-md md:text-2xl font-bold text-gray-700 flex items-center space-x-2">
              <span className="text-gray-600 hidden sm:block">
                Time Left:
              </span>
              <span
                id="timer"
                className="inline-block bg-gray-200 text-gray-900 px-4 py-1 rounded-lg"
              >
                2:00:00
              </span>
              <span
                id="timer-exceed"
                className="bg-gray-200 text-gray-900 px-4 py-1 rounded-lg hidden"
              >
                0:00:00
              </span>
            </div>
    
            {/* Buttons */}
            <div className="flex space-x-2 sm:space-x-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-lg shadow-md transition duration-200"
                onClick={onSubmit}
              >
                Submit
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-lg shadow-md transition duration-200"
                onClick={onExit}
              >
                Exit Exam
              </button>
            </div>
          </div>
        </div>
    );
}
