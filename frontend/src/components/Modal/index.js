import React from 'react';

const Modal = ({show, onClose, children}) => {

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    
    return (
        <>
        {show && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50" onClick={handleOutsideClick}>
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        )}
        </>
    );
};

export default Modal;