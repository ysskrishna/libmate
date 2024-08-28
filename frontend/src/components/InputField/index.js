"use client";


const InputField = ({label, errorMessage, className, ...props }) => {
    const isError = errorMessage ? true : false;

    return (
        <div>
            <label className={`block mb-2 text-sm font-medium ${isError ? 'text-red-600' : 'text-gray-600'}`}>
                {label}
            </label>
            <input 
                className={`w-full p-3  border rounded text-gray-600 ${
                    isError 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500'
                } ${className}`}
                {...props}
            />
            {isError && (
                <p className="mt-2 text-sm text-red-500 font-medium">
                    {errorMessage}
                </p>
            )}  
        </div>
    );
  };
  
export default InputField;