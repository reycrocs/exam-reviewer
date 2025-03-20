import React from 'react';

interface CustomButtonProps {
  text: string; // The text to display on the button
  onClick: () => void; // Function to be called when the button is clicked
  className?: string; // Optional custom class names
  type?: 'button' | 'submit' | 'reset'; // The type of the button, default is 'button'
  disabled?: boolean; // Optional disabled state
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm text-white transition-all duration-200 
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-green-600'}
        ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default CustomButton;
