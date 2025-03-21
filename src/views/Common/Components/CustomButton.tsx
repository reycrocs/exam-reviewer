import React from 'react';

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  pill?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  className = "bg-gray-900 text-white hover:bg-green-600",
  type = 'button',
  disabled = false,
  pill,
}) => {
  return (
    <div className="relative inline-block">
      <button
        type={type}
        onClick={onClick}
        className={`
          px-4 py-2 rounded-md text-sm
          ${disabled ? 'bg-gray-400 cursor-not-allowed' : ''}
          ${className}
          transition-colors duration-300 ease-in-out
        `}
        disabled={disabled}
      >
        {text}
      </button>
      {pill && (
        <span className="absolute -top-2 -right-3 bg-green-600 text-white font-light text-[10px] px-2 py-0.5 rounded-full rotate-[30deg] shadow-md">
          {pill}
        </span>
      )}
    </div>
  );
};

export default CustomButton;
