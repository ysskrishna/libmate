"use client";

import Button from '@/components/Button';

const BookCard = ({ book, onReturnClick }) => {
  return (
    <div className="flex flex-col items-start bg-white shadow-md rounded-lg p-3 w-full mx-auto flex-grow">
      <h3 className="text-xl font-semibold text-gray-800">{book?.book?.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{book?.book?.description}</p>
      <p className="text-sm text-gray-500">Borrowed on: {book?.collected_date}</p>
      {book.return_date ? (
        <p className="text-sm text-gray-500">Return Date: {book?.return_date}</p>
      ) : (
        <>
          <p className="text-sm text-gray-500">Submission Due: {book?.due_date}</p>
          <Button 
            buttonContainerClassName="!bg-red-100 !text-red-600 hover:!bg-red-200 mt-2"
            onClick={() => onReturnClick(book)}
          >
            Return
          </Button>
        </>
      )}
    </div>
  );
};

export default BookCard;
