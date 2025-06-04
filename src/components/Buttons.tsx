"use client";
import React from "react";

interface buttonProps {
  className: string;
  label: string | React.ReactNode;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
}

const Buttons = ({ className, label, type = "button", onClick }: buttonProps) => {
  return (
    <button
      type={type}
      className={`${className} bg-white rounded-full py-2 px-5 cursor-pointer`}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default Buttons;
