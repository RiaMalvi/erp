import clsx from "clsx";
import React from "react";

interface ButtonProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
  completed?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  loading,
  disabled,
  completed,
  children,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "px-4 bg-primary-purple text-white rounded-md py-2 hover:bg-blue-primary/80 transition-all duration-300 font-semibold disabled:bg-[#757579a4] disabled:text-[#7e7e81] disabled:cursor-not-allowed",
        loading && "bg-repeating-linear-gradient scale-95",
        className
      )}
      disabled={disabled}
    >
      {loading ? "Loading..." : completed ? "Completed" : children}
    </button>
  );
};

export default Button;
