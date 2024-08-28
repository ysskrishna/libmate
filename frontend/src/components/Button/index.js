"use client";


const Button = ({ children, ...props }) => {
    return (
      <button
        type="submit"
        className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600 transition duration-200"
        {...props}
      >
        {children}
      </button>
    );
  };
  
export default Button;