"use client";

import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

const ButtonSpinner = () => {  
  return (
    <FaSpinner className="animate-spin inline-block" />
  );
}

const Button = ({ children, onClick, isLoading,  buttonContainerClassName='', ...props }) => {
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setLocalLoading(true);
      const timer = setTimeout(() => {
        setLocalLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setLocalLoading(false);
    }
  }, [isLoading]);

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      type="submit"
      className={`text-white py-2 px-4 rounded transition duration-200 bg-purple-500 hover:bg-purple-600 font-semibold ${buttonContainerClassName}`}
      onClick={handleClick}
      disabled={localLoading}
      {...props}
    >
      {children}
      {localLoading && (
        <span className="ml-1"><ButtonSpinner /></span>
      )}
    </button>
  );
  };
  
export default Button;

