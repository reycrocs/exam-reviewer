import React, { ReactNode } from "react";

interface CustomButtonProps {
  text?: string;
  children?: ReactNode;
  onClick: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  pill?: string;
  buttonType?: "default" | "icon" | "circle";
  tooltip?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  children,
  onClick,
  className = "bg-gray-900 text-white hover:bg-green-600",
  type = "button",
  disabled = false,
  pill,
  buttonType = "default",
  tooltip,
}) => {
  const baseStyles = `
    ${disabled ? "bg-gray-400 cursor-not-allowed" : ""}
    ${className}
    transition-colors duration-300 ease-in-out
  `;

  const buttonShape =
    buttonType === "circle"
      ? "w-7 h-7 p-0 rounded-full"
      : buttonType === "icon"
      ? "p-2 rounded-md"
      : "px-4 py-2 rounded-md text-sm";

  return (
    <div className="relative inline-block group">
      <button
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${buttonShape} flex items-center justify-center`}
        disabled={disabled}
      >
        {children ? children : text}
      </button>

      {tooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
          {tooltip}
        </div>
      )}

      {pill && (
        <span className="absolute -top-2 -right-3 bg-green-600 text-white font-light text-[10px] px-2 py-0.5 rounded-full rotate-[30deg] shadow-md">
          {pill}
        </span>
      )}
    </div>
  );
};

export default CustomButton;
