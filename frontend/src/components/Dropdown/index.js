"use client";

{/* className={`w-full p-3 border rounded text-gray-600 ${formik.touched.role && formik.errors.role ? 'border-red-500' : 'border-gray-300'}`} */}
const Dropdown = ({ label, errorMessage, className, children, ...props }) => {
    const isError = errorMessage ? true : false;

    return (
      <div>
        <label className={`block mb-2 text-sm font-medium ${isError ? 'text-red-600' : 'text-gray-600'}`}>
            {label}
        </label>
        <select
            className={`w-full p-3  border rounded text-gray-600 ${
                isError 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:border-blue-500'
            } ${className}`}
            {...props}
          >
            {children}
          </select>
          {isError && (
                <p className="mt-2 text-sm text-red-500 font-medium">
                    {errorMessage}
                </p>
            )}
      </div>
    );
  };
  
export default Dropdown;